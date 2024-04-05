import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getEventById } from '../dynamodb/client.js';
import { apiResponse } from './response.js';
import { getCognitoToken } from './utils.js';

const eventsGetById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const isValidToken = await getCognitoToken(event.headers.Authorization);
    if (!isValidToken) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    const id = event.pathParameters?.id;
    if (!id) {
        return apiResponse(400);
    }

    try {
        const event = await getEventById(id);

        if (!event) {
            return apiResponse(404);
        }

        const transformedItem: Record<string, unknown> = {};
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
