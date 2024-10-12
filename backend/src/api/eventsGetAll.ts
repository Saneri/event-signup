import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getAllEvents } from '../dynamodb/eventService';
import { apiResponse } from './response';
import { Event } from './types';
import { getCognitoToken, getEventIdFromPK } from './utils';

const eventsGet = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const userSub = await getCognitoToken(event.headers.Authorization);
    if (!userSub) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    try {
        const events = await getAllEvents(userSub);

        if (!events) {
            return apiResponse(200, []);
        }

        const data: Event[] = events.map((event) => {
            return {
                name: event.name.S,
                description: event.description.S,
                datetime: event.datetime.S,
                id: getEventIdFromPK(event.PK.S),
            };
        });

        return apiResponse(200, data);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsGet;
