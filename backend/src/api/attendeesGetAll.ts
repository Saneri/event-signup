import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getAllAttendees } from '../dynamodb/attendeeService';
import { apiResponse } from './response';
import { getCognitoToken } from './utils';
import { Attendee } from './types';

const attendeesGetAll = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const isValidToken = await getCognitoToken(event.headers.Authorization);
    if (!isValidToken) {
        return apiResponse(401, { message: 'Unauthorized' });
    }

    const id = event.pathParameters?.id;
    if (!id) {
        return apiResponse(400);
    }
    try {
        const attendees = await getAllAttendees(id);

        if (!attendees) {
            return apiResponse(200, []);
        }

        const data: Attendee[] = attendees.map((attendee) => {
            return {
                name: attendee.name.S,
                attending: attendee.attending?.BOOL,
            };
        });

        return apiResponse(200, data);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default attendeesGetAll;
