import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
    endpoint: process.env.DYNAMODB_URL || 'http://host.docker.internal:8000',
    region: 'localhost',
});

export default client;
