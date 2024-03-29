import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { postEvent } from '../dynamodb/client';
import { apiResponse } from './response';
import { DynamoEvent } from './types';
import { verifyCognitoToken } from './utils';

const validateEventBody = (requestBody: string | null): DynamoEvent | null => {
    const body = JSON.parse(requestBody || '{}');
    if (typeof body.name !== 'string' || isNaN(Date.parse(body.datetime)) || typeof body.description !== 'string') {
        return null;
    }
    return body;
};

const eventsPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const isValidToken = await verifyCognitoToken(event.headers.Authorization);
    if (!isValidToken) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    try {
        const requestBody = validateEventBody(event.body);
        if (!requestBody) {
            return apiResponse(400);
        }
        await postEvent(requestBody);
        return apiResponse(201);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsPost;
