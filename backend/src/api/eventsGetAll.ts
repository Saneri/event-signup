import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getAllEvents } from '../dynamodb/client';
import { apiResponse } from './response';
import { Event } from './types';
import { getCognitoToken } from './utils';

const FIND_ID_REGEX = /event_([0-9a-fA-F-]+)/;

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
                id: event.PK.S?.match(FIND_ID_REGEX)?.[1],
            };
        });

        return apiResponse(200, data);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsGet;
