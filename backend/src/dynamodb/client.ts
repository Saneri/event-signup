import {
    AttributeValue,
    DynamoDBClient,
    PutItemCommand,
    QueryCommand,
    QueryCommandInput,
    ScanCommand,
    ScanCommandInput,
    ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { EventPostRequestBody } from '../api/types';

const DYNAMO_TABLE_NAME = 'eventSignupTable';

const client = new DynamoDBClient({
    endpoint: process.env.DYNAMODB_URL || 'http://host.docker.internal:8000',
    region: 'localhost',
});

export const getAllEvents = async (): Promise<Record<string, AttributeValue>[] | undefined> => {
    // scan takes too much time, use query (with index) instead
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        FilterExpression: 'begins_with(PK,:pk) AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': { S: 'event' },
            ':sk': { S: 'meta' },
        },
    };
    const queryCommand = new ScanCommand(params);
    const result = await client.send(queryCommand);
    return result.Items;
};

export const postEvent = async (body: EventPostRequestBody) => {
    const itemToPut = {
        TableName: DYNAMO_TABLE_NAME,
        Item: {
            id: { S: body.id },
            name: { S: body.name },
            datetime: { S: body.datetime },
            description: {
                S: body.description,
            },
        },
    };

    const command = new PutItemCommand(itemToPut);
    await client.send(command);
};

export default client;
