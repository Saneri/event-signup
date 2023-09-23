import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import eventsGet from './api/eventsGet';
import eventsPost from './api/eventsPost';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const eventsGetHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return eventsGet(event);
};

export const eventsPostHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return eventsPost(event);
};