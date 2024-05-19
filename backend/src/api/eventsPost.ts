import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { addAttendeeToEvent, postEvent } from '../dynamodb/client';
import { apiResponse } from './response';
import { DynamoEvent } from './types';
import { getCognitoToken } from './utils';

const validateEventBody = (requestBody: string | null): DynamoEvent | null => {
    const body = JSON.parse(requestBody || '{}');
    if (typeof body.name !== 'string' || isNaN(Date.parse(body.datetime)) || typeof body.description !== 'string') {
        return null;
    }
    return body;
};

const eventsPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userSub = await getCognitoToken(event.headers.Authorization);
    if (!userSub) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    try {
        const requestBody = validateEventBody(event.body);
        if (!requestBody) {
            return apiResponse(400);
        }
        const eventId = await postEvent(requestBody);
        // automatically add the creator of the event as an attendee
        await addAttendeeToEvent(eventId, userSub);
        return apiResponse(201);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsPost;
