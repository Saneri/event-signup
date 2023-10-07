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

        const data: Record<string, any> = events.map((item) => {
            const transformedItem: Record<string, any> = {};
            Object.keys(item).forEach((key) => {
                transformedItem[key] = item[key].S;
            });
            transformedItem.id = transformedItem.PK.match(FIND_ID_REGEX)[1];
            return transformedItem;
        });

        return apiResponse(200, data);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsGet;
