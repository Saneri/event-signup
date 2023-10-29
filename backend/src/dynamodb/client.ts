import { AttributeValue, DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { randomUUID } from 'crypto';
import { Event } from '../api/types';

const DYNAMO_TABLE_NAME = 'eventSignupTable';

const client = new DynamoDBClient({
    endpoint: process.env.ENV === 'dev' ? 'http://host.docker.internal:8000' : undefined,
    region: process.env.ENV === 'dev' ? 'localhost' : undefined,
});

export const getAllEvents = async (): Promise<Record<string, AttributeValue>[] | undefined> => {
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        IndexName: 'GSI1',
        KeyConditionExpression: 'SK = :sk',
        ExpressionAttributeValues: {
            ':sk': { S: 'meta' },
        },
    };

    const result = await client.send(new QueryCommand(params));
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
    const result = await client.send(new GetItemCommand(params));
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

    await client.send(new PutItemCommand(itemToPut));
};

export const getAllAttendees = async (eventId: string): Promise<Record<string, AttributeValue>[] | undefined> => {
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK,:sk)',
        ExpressionAttributeValues: {
            ':pk': { S: `event_${eventId}` },
            ':sk': { S: 'attendee_' },
        },
    };

    const result = await client.send(new QueryCommand(params));
    return result.Items;
};

export default client;
