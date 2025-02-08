import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from './response';
import { getCognitoToken } from './utils';
import { getEventById, updateEvent } from '../dynamodb/eventService';
import { DynamoEventUpdate } from './types';

const eventsPatch = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userSub = await getCognitoToken(event.headers.Authorization);
    if (!userSub) {
        return apiResponse(401, { message: 'Unauthorized' });
    }
    const id = event.pathParameters?.id;
    if (!id) {
        return apiResponse(400, { message: 'Event id missing from path parameters' });
    }

    try {
        const eventInDb = await getEventById(id);
        if (!eventInDb) {
            return apiResponse(404);
        }

        if (eventInDb.admin?.S !== userSub && !process.env.MOCK_AUTH) {
            return apiResponse(403, { message: 'User must be event admin' });
        }

        const body = JSON.parse(event.body || '{}');
        const updatedEvent: DynamoEventUpdate = {};

        if (typeof body.name === 'string') {
            updatedEvent.name = body.name;
        }
        if (!isNaN(Date.parse(body.datetime))) {
            updatedEvent.datetime = body.datetime;
        }
        if (typeof body.description === 'string') {
            updatedEvent.description = body.description;
        }
        if (!isNaN(Date.parse(body.expiryTimestamp))) {
            updatedEvent.expiryTimestamp = body.expiryTimestamp;
        }

        if (Object.keys(updatedEvent).length === 0) {
            return apiResponse(400, { message: 'No valid fields to update' });
        }

        await updateEvent(id, updatedEvent);
        return apiResponse(200);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsPatch;
