import { APIGatewayProxyEvent } from 'aws-lambda';
import attendeesGetAll from './attendeesGetAll';
import { getCognitoToken } from './utils';

jest.mock('./utils');

describe('attendeesGetAll', () => {
    it('returns 401 when the token is not valid', async () => {
        (getCognitoToken as jest.Mock).mockResolvedValue(false);

        const event: APIGatewayProxyEvent = {
            headers: {
                Authorization: 'invalid token',
            },
            pathParameters: {
                id: '1',
            },
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '/attendees',
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            resource: '/attendees',
            body: null,
            multiValueHeaders: {},
            requestContext: {
                accountId: '',
                apiId: '',
                authorizer: undefined,
                protocol: '',
                httpMethod: '',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    clientCert: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '',
                stage: '',
                requestId: '',
                requestTimeEpoch: 0,
                resourceId: '',
                resourcePath: '',
            },
        };

        const response = await attendeesGetAll(event);

        expect(response.statusCode).toBe(401);
    });
});
