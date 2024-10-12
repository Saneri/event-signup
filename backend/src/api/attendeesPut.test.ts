import { APIGatewayProxyEvent } from 'aws-lambda';
import { editAttendee } from '../dynamodb/attendeeService';
import attendeesPut from './attendeesPut';
import { apiResponse } from './response';
import { getCognitoToken } from './utils';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { getUserNickname } from '../auth/cognito';

jest.mock('./utils');
jest.mock('../dynamodb/attendeeService');
jest.mock('../auth/cognito');

describe('attendeesPut', () => {
    const mockEvent: Partial<APIGatewayProxyEvent> = {
        headers: {
            Authorization: 'Bearer token',
        },
        pathParameters: {
            id: 'event123',
        },
        body: JSON.stringify({ attending: true }),
    };

    const mockUserSub = 'user123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if user is unauthorized', async () => {
        (getCognitoToken as jest.Mock).mockResolvedValue(null);

        const result = await attendeesPut(mockEvent as APIGatewayProxyEvent);

        expect(result).toEqual(apiResponse(401, { message: 'Unauthorized' }));
    });

    it('should return 400 if event ID is missing', async () => {
        const eventWithoutId = { ...mockEvent, pathParameters: {} };

        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);

        const result = await attendeesPut(eventWithoutId as APIGatewayProxyEvent);

        expect(result).toEqual(apiResponse(400, { message: 'Event id missing from path parameters' }));
    });

    it('should return 400 if request body is invalid', async () => {
        const eventWithoutAttending = { ...mockEvent, body: '{}' };
        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);

        const result = await attendeesPut(eventWithoutAttending as APIGatewayProxyEvent);

        expect(result).toEqual(apiResponse(400, { message: 'Invalid request body' }));
    });

    it('should return 201 if attendee is added to the event when marking attendance', async () => {
        const mockEventWithNewAttendee: Partial<APIGatewayProxyEvent> = {
            ...mockEvent,
            body: JSON.stringify({ attending: true }),
        };

        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);
        (getUserNickname as jest.Mock).mockResolvedValue('User Name');
        (editAttendee as jest.Mock).mockRejectedValue(
            new ConditionalCheckFailedException({
                message: '',
                $metadata: {},
            }),
        );

        const result = await attendeesPut(mockEventWithNewAttendee as APIGatewayProxyEvent);

        expect(editAttendee).toHaveBeenCalledWith(true, 'event123', 'user123');
        expect(result).toEqual(apiResponse(201, { message: 'User added to the event' }));
    });

    it('should return 200 if attendee is successfully updated', async () => {
        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);
        (editAttendee as jest.Mock).mockResolvedValue(undefined);

        const result = await attendeesPut(mockEvent as APIGatewayProxyEvent);

        expect(editAttendee).toHaveBeenCalledWith(true, 'event123', 'user123');
        expect(result).toEqual(apiResponse(200, { message: 'Attendance status updated' }));
    });
});
