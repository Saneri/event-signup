import { APIGatewayProxyResult } from 'aws-lambda';
import { getReasonPhrase } from 'http-status-codes';

export const apiResponse = (statusCode: number, body?: object): APIGatewayProxyResult => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body || { message: getReasonPhrase(statusCode) }),
    };
};
