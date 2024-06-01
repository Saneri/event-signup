import {
    AttributeValue,
    BatchGetItemCommand,
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { randomUUID } from 'crypto';
import { DynamoAttendee, DynamoEvent } from '../api/types';

const DYNAMO_TABLE_NAME = 'eventSignupTable';

const client = new DynamoDBClient({
    endpoint: process.env.ENV === 'dev' ? 'http://host.docker.internal:8000' : undefined,
    region: process.env.ENV === 'dev' ? 'localhost' : undefined,
});

/**
 * Retrieves all events associated with a user.
 * First queries the GSI1 index to find all events the user is attending.
 * Then queries the table for the event metadata.
 * @param userSub - The user's unique identifier.
 * @returns A promise that resolves to an array of event records.
 */
export const getAllEvents = async (userSub: string): Promise<Record<string, AttributeValue>[] | undefined> => {
    const attendeeParams = {
        TableName: DYNAMO_TABLE_NAME,
        IndexName: 'GSI1',
        KeyConditionExpression: 'SK = :sk',
        ExpressionAttributeValues: {
            ':sk': { S: `attendee_${userSub}` },
        },
    };

    const attendeeResult = await client.send(new QueryCommand(attendeeParams));
    const attendeeItems = attendeeResult.Items;

    if (!attendeeItems || attendeeItems.length === 0) {
        return [];
    }

    const eventKeys = attendeeItems.map((item) => ({
        PK: item.PK,
        SK: { S: 'meta' },
    }));

    const eventParams = {
        RequestItems: {
            [DYNAMO_TABLE_NAME]: {
                Keys: eventKeys,
            },
        },
    };

    const eventResult = await client.send(new BatchGetItemCommand(eventParams));
    return eventResult.Responses?.[DYNAMO_TABLE_NAME];
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

export const postEvent = async (body: DynamoEvent): Promise<string> => {
    const eventId = randomUUID();

    const itemToPut: {
        TableName: string;
        Item: { [key: string]: { S: string } };
    } = {
        TableName: DYNAMO_TABLE_NAME,
        Item: {
            PK: { S: `event_${eventId}` },
            SK: { S: 'meta' },
            name: { S: body.name },
            datetime: { S: body.datetime },
            description: {
                S: body.description,
            },
        },
    };

    if (body.expiryTimestamp) {
        itemToPut.Item.expiryTimestamp = { S: body.expiryTimestamp };
    }

    await client.send(new PutItemCommand(itemToPut));
    return eventId;
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

export const editAttendee = async (body: DynamoAttendee, eventId: string, userSub: string): Promise<void> => {
    const itemToUpdate = {
        TableName: DYNAMO_TABLE_NAME,
        Key: {
            PK: { S: `event_${eventId}` },
            SK: { S: `attendee_${userSub}` },
        },
        UpdateExpression: 'SET #A = :a',
        ExpressionAttributeNames: {
            '#A': 'attending',
        },
        ExpressionAttributeValues: {
            ':a': { BOOL: body.attending },
        },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
        ReturnValues: 'UPDATED_NEW',
    };

    await client.send(new UpdateItemCommand(itemToUpdate));
};

export const addAttendeeToEvent = async (eventId: string, userSub: string, name: string): Promise<void> => {
    const itemToPut = {
        TableName: DYNAMO_TABLE_NAME,
        Item: {
            PK: { S: `event_${eventId}` },
            SK: { S: `attendee_${userSub}` },
            name: { S: name },
            attending: { BOOL: true },
        },
    };

    await client.send(new PutItemCommand(itemToPut));
};

export default client;
