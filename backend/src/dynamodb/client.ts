import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const DYNAMO_TABLE_NAME = 'eventSignupTable';

const client = new DynamoDBClient({
    endpoint: process.env.ENV === 'dev' ? 'http://host.docker.internal:8000' : undefined,
    region: process.env.ENV === 'dev' ? 'localhost' : undefined,
});

export default client;
