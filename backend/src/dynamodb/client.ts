import {
    AttributeValue,
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    ScanCommandInput,
    ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { EventPostRequestBody } from '../api/types';

const EVENT_TABLE_NAME = 'event';

const client = new DynamoDBClient({
    endpoint: process.env.DYNAMODB_URL || 'http://host.docker.internal:8000',
    region: 'localhost',
});

export const getAllEvents = async (): Promise<Record<string, AttributeValue>[] | undefined> => {
    const params: ScanCommandInput = {
        TableName: EVENT_TABLE_NAME,
    };
    const scanCommand = new ScanCommand(params);
    const result: ScanCommandOutput = await client.send(scanCommand);
    return result.Items;
};

export const postEvent = async (body: EventPostRequestBody) => {
    const itemToPut = {
        TableName: EVENT_TABLE_NAME,
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
