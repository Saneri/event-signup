import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getEventById } from '../dynamodb/client.js';
import { apiResponse } from './response.js';

const eventsGetById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;
    if (!id) {
        return apiResponse(400);
    }

    try {
        const event = await getEventById(id);

        if (!event) {
            return apiResponse(404);
        }

        const transformedItem: Record<string, any> = {};
        Object.keys(event).forEach((key) => {
            transformedItem[key] = event[key].S;
        });

        return apiResponse(200, transformedItem);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsGetById;
