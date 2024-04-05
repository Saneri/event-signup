import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from './response';
import { getCognitoToken } from './utils';
import { DynamoAttendee } from './types';
import { editAttendee } from '../dynamodb/client';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';

const validateEventBody = (requestBody: string | null): DynamoAttendee | null => {
    const body = JSON.parse(requestBody || '{}');
    if (typeof body.attending !== 'boolean') {
        return null;
    }
    return body;
};

const attendeesPut = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userSub = await getCognitoToken(event.headers.Authorization);
    if (!userSub) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    const eventId = event.pathParameters?.id;
    if (!eventId) {
        return apiResponse(400);
    }

    try {
        const requestBody = validateEventBody(event.body);
        if (!requestBody) {
            return apiResponse(400);
        }
        await editAttendee(requestBody, eventId, userSub);
        return apiResponse(200);
    } catch (err) {
        if (err instanceof ConditionalCheckFailedException) {
            return apiResponse(404, { message: 'User not found from the selected event' });
        }
        console.error(err);
        return apiResponse(500);
    }
};

export default attendeesPut;
