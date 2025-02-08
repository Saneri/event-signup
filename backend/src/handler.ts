import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import eventsGetAll from './api/eventsGetAll';
import eventsPost from './api/eventsPost';
import eventsGetById from './api/eventsGetById';
import attendeesGetAll from './api/attendeesGetAll';
import attendeesPut from './api/attendeesPut';
import eventsPatch from './api/eventsPatch';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const eventsGetAllHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return eventsGetAll(event);
};

export const eventsPostHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return eventsPost(event);
};

export const eventsGetByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return eventsGetById(event);
};

export const eventsPatchHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return eventsPatch(event);
};

export const attendeesGetAllHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return attendeesGetAll(event);
};

export const attendeesPutHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return attendeesPut(event);
};
