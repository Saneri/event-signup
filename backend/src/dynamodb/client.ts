import { AttributeValue, DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { randomUUID } from 'crypto';
import { Event } from '../api/types';

const DYNAMO_TABLE_NAME = 'eventSignupTable';

const client = new DynamoDBClient({
    endpoint: process.env.ENV === 'dev' ? 'http://host.docker.internal:8000' : undefined,
    region: process.env.ENV === 'dev' ? 'localhost' : undefined,
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

export const getEventById = async (id: string): Promise<Record<string, AttributeValue> | undefined> => {
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        Key: {
            PK: { S: `event_${id}` },
            SK: { S: 'meta' },
        },
    };
    const queryCommand = new GetItemCommand(params);
    const result = await client.send(queryCommand);
    return result.Item;
};

export const postEvent = async (body: Event) => {
    const itemToPut = {
        TableName: DYNAMO_TABLE_NAME,
        Item: {
            PK: { S: `event_${randomUUID()}` },
            SK: { S: 'meta' },
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

export const getAllAttendees = async (eventId: string): Promise<Record<string, AttributeValue>[] | undefined> => {
    // scan takes too much time, use query (with index) instead
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        FilterExpression: 'PK = :pk AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': { S: eventId },
            ':sk': { S: 'attendee' },
        },
    };
    const queryCommand = new ScanCommand(params);
    const result = await client.send(queryCommand);
    return result.Items;
};

export default client;
