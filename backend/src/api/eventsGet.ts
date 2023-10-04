import { APIGatewayProxyResult } from 'aws-lambda';
import { getAllEvents } from './../dynamodb/client.js';
import { apiResponse } from './response.js';

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
            return transformedItem;
        });

        return apiResponse(200, data);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsGet;
