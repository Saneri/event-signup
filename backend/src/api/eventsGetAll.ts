import { APIGatewayProxyResult } from 'aws-lambda';
import { getAllEvents } from '../dynamodb/client.js';
import { apiResponse } from './response.js';

const FIND_ID_REGEX = /event_([0-9a-fA-F-]+)/;

const eventsGet = async (): Promise<APIGatewayProxyResult> => {
    try {
        const events = await getAllEvents();

        if (!events) {
            return apiResponse(200, []);
        }

        const data: Record<string, any> = events.map((event) => {
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
