import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getAttendee, getEventById } from '../dynamodb/client';
import { apiResponse } from './response';
import { Event } from './types';
import { getCognitoToken, getEventIdFromPK } from './utils';

const eventsGetById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userSub = await getCognitoToken(event.headers.Authorization);
    if (!userSub) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    const id = event.pathParameters?.id;
    if (!id) {
        return apiResponse(400);
    }

    try {
        const attended = await getAttendee(id, userSub);
        if (!attended) {
            return apiResponse(403);
        }
        const event = await getEventById(id);

        if (!event) {
            return apiResponse(404);
        }

        const eventPayload: Event = {
            name: event.name.S,
            datetime: event.datetime.S,
            description: event.description.S,
            id: getEventIdFromPK(event.PK.S),
        };

        return apiResponse(200, eventPayload);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsGetById;
