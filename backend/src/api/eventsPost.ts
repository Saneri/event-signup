import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { postEvent } from '../dynamodb/client';
import { EventPostRequestBody } from './types';

const validateEventBody = (requestBody: string | null): EventPostRequestBody | null => {
    const body = JSON.parse(requestBody || '{}');
    if (
        typeof body.id !== 'string' ||
        typeof body.name !== 'string' ||
        isNaN(Date.parse(body.datetime)) ||
        typeof body.description !== 'string'
    ) {
        return null;
    }
    return body;
};

const eventsPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const requestBody = validateEventBody(event.body);
        if (!requestBody) {
            return { statusCode: 400, body: JSON.stringify({ message: 'Bad Request' }) };
        }

        await postEvent(requestBody);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Created' }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
            }),
        };
    }
};

export default eventsPost;
