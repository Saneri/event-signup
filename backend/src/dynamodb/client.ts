import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const DYNAMO_TABLE_NAME = 'eventSignupTable';

let endpoint: string | undefined;
let region: string | undefined;

switch (process.env.ENV) {
    case 'dev':
        endpoint = 'http://host.docker.internal:8000';
        region = 'localhost';
        break;
    case 'test':
        endpoint = 'http://localhost:8000';
        region = 'localhost';
        break;
    default:
        endpoint = undefined;
        region = undefined;
        break;
}

const client = new DynamoDBClient({
    endpoint,
    region,
});
export default client;
