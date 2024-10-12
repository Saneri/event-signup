import { APIGatewayProxyEvent } from 'aws-lambda';
import { getAttendee } from '../dynamodb/attendeeService';
import { getEventById } from '../dynamodb/eventService';
import eventsGetById from './eventsGetById';
import { apiResponse } from './response';
import { getCognitoToken } from './utils';

jest.mock('../dynamodb/eventService');
jest.mock('./response');
jest.mock('./utils');
jest.mock('../dynamodb/attendeeService');

describe('eventsGetById', () => {
    const mockEvent: Partial<APIGatewayProxyEvent> = {
        headers: {
            Authorization: 'Bearer token',
        },
        pathParameters: {
            id: 'event123',
        },
        queryStringParameters: {
            key: 'invitationKey',
        },
    };

    const mockUserSub = '12345';
    const mockEventData = {
        PK: { S: 'event_123' },
        SK: { S: 'meta' },
        name: { S: 'Birthday Party' },
        description: { S: 'A fun birthday party' },
        datetime: { S: '2023-10-10T10:00:00Z' },
        key: { S: 'invitationKey' },
        admin: { S: '54321' },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if user is unauthorized', async () => {
        (getCognitoToken as jest.Mock).mockResolvedValue(null);

        const result = await eventsGetById(mockEvent as APIGatewayProxyEvent);

        expect(result).toEqual(apiResponse(401, { message: 'Unauthorized' }));
    });

    it('should return 400 if event ID is missing', async () => {
        const eventWithoutId = { ...mockEvent, pathParameters: {} };

        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);

        const result = await eventsGetById(eventWithoutId as APIGatewayProxyEvent);

        expect(apiResponse).toHaveBeenCalledWith(400);
        expect(result).toEqual(apiResponse(400));
    });

    it('should return 404 if event is not found', async () => {
        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);
        (getEventById as jest.Mock).mockResolvedValue(null);

        const result = await eventsGetById(mockEvent as APIGatewayProxyEvent);

        expect(result).toEqual(apiResponse(404));
    });

    it('should return 403 if invitation key is incorrect', async () => {
        const eventWithWrongKey = { ...mockEvent, queryStringParameters: { key: 'wrongKey' } };

        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);
        (getEventById as jest.Mock).mockResolvedValue(mockEventData);
        (getAttendee as jest.Mock).mockResolvedValue(null);

        const result = await eventsGetById(eventWithWrongKey as APIGatewayProxyEvent);

        expect(result).toEqual(apiResponse(403));
    });

    it('should return 200 with event data if user is authorized and invitation key is correct', async () => {
        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);
        (getEventById as jest.Mock).mockResolvedValue(mockEventData);
        (getAttendee as jest.Mock).mockResolvedValue({});

        const result = await eventsGetById(mockEvent as APIGatewayProxyEvent);

        expect(result).toEqual(
            apiResponse(200, {
                name: 'Birthday Party',
                description: 'A fun birthday party',
                datetime: '2023-10-10T10:00:00Z',
                id: '123',
                admin: false,
            }),
        );
    });

    it('should return admin set to true if user is the admin', async () => {
        const mockEventDataWithAdmin = {
            ...mockEventData,
            admin: { S: mockUserSub },
        };

        (getCognitoToken as jest.Mock).mockResolvedValue(mockUserSub);
        (getEventById as jest.Mock).mockResolvedValue(mockEventDataWithAdmin);
        (getAttendee as jest.Mock).mockResolvedValue({});

        const result = await eventsGetById(mockEvent as APIGatewayProxyEvent);

        expect(result).toEqual(
            apiResponse(200, {
                name: 'Birthday Party',
                description: 'A fun birthday party',
                datetime: '2023-10-10T10:00:00Z',
                id: 'event123',
                admin: true,
            }),
        );
    });
});
