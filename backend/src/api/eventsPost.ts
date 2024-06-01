import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { addAttendeeToEvent, postEvent } from '../dynamodb/client';
import { apiResponse } from './response';
import { DynamoEvent } from './types';
import { getCognitoToken } from './utils';
import { getUserNickname } from '../auth/cognito';

const validateEventBody = (requestBody: string | null): DynamoEvent | null => {
    const body = JSON.parse(requestBody || '{}');
    if (
        typeof body.name !== 'string' ||
        isNaN(Date.parse(body.datetime)) ||
        typeof body.description !== 'string' ||
        (body.expiryTimestamp !== null && isNaN(Date.parse(body.expiryTimestamp)))
    ) {
        return null;
    }
    return body;
};

const eventsPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const authHeader = event.headers.Authorization;
    const userSub = await getCognitoToken(authHeader);
    if (!authHeader || !userSub) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    try {
        const requestBody = validateEventBody(event.body);
        if (!requestBody) {
            return apiResponse(400);
        }
        const eventId = await postEvent(requestBody);

        // automatically add the creator of the event as an attendee
        const name = await getUserNickname(authHeader.split(' ')[1]);
        if (!name) {
            console.error('Failed to get user nickname for user:', userSub);
        }
        await addAttendeeToEvent(eventId, userSub, name ?? 'Unknown');

        return apiResponse(201, { eventId });
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default eventsPost;
