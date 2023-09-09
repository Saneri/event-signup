import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'localhost',
});

export default client;
