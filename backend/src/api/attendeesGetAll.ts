import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getAllAttendees } from '../dynamodb/client.js';
import { apiResponse } from './response.js';

const attendeesGetAll = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;
    if (!id) {
        return apiResponse(400);
    }
    try {
        const attendees = await getAllAttendees(id);

        if (!attendees) {
            return apiResponse(200, []);
        }

        const data: Record<string, any> = attendees.map((attendee) => {
            return {
                name: attendee.name.S,
                attending: attendee.attending.BOOL,
            };
        });

        return apiResponse(200, data);
    } catch (err) {
        console.error(err);
        return apiResponse(500);
    }
};

export default attendeesGetAll;
