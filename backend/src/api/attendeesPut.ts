import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from './response';
import { getCognitoToken } from './utils';
import { DynamoAttendee } from './types';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { addAttendeeToEvent, editAttendee } from '../dynamodb/attendeeService';
import { getUserNickname } from '../auth/cognito';

const validateEventBody = (requestBody: string | null): DynamoAttendee | null => {
    const body = JSON.parse(requestBody || '{}');
    if (typeof body.attending !== 'boolean') {
        return null;
    }
    return body;
};

/**
 * Tries to update the attendance status of a attendee for an event.
 * If the attendee does not exist, they are added to the event with the corresponding status.
 *
 * @param event The API Gateway event containing request data.
 * @returns The result of the API call.
 */
const attendeesPut = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const authHeader = event.headers.Authorization;
    const userSub = await getCognitoToken(authHeader);
    if (!authHeader || !userSub) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    const eventId = event.pathParameters?.id;
    if (!eventId) {
        return apiResponse(400, { message: 'Event id missing from path parameters' });
    }

    const requestBody = validateEventBody(event.body);
    if (!requestBody) {
        return apiResponse(400, { message: 'Invalid request body' });
    }
    const attending = requestBody.attending;

    try {
        await editAttendee(attending, eventId, userSub);
        return apiResponse(200, { message: 'Attendance status updated' });
    } catch (err) {
        if (err instanceof ConditionalCheckFailedException) {
            const name = await getUserNickname(authHeader.split(' ')[1]);
            if (!name) {
                console.error('Failed to get user nickname for user:', userSub);
            }
            return handleConditionalCheckFailed(eventId, userSub, attending, name ?? 'Unknown');
        }
        console.error('Error updating attendee:', err);
        return apiResponse(500);
    }
};

const handleConditionalCheckFailed = async (
    eventId: string,
    userSub: string,
    attending: boolean,
    name: string,
): Promise<APIGatewayProxyResult> => {
    try {
        await addAttendeeToEvent(eventId, userSub, name, attending);
        return apiResponse(201, { message: 'User added to the event' });
    } catch (error) {
        console.error('Error adding attendee to event:', error);
        return apiResponse(500, { message: 'Failed to add user to the event' });
    }
};

export default attendeesPut;
