import {
    AttributeValue,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import client, { DYNAMO_TABLE_NAME } from './client';

export const getAttendee = async (
    eventId: string,
    userSub: string,
): Promise<Record<string, AttributeValue> | undefined> => {
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        Key: {
            PK: { S: `event_${eventId}` },
            SK: { S: `attendee_${userSub}` },
        },
    };

    const result = await client.send(new GetItemCommand(params));
    return result.Item;
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

export const editAttendee = async (attending: boolean, eventId: string, userSub: string): Promise<void> => {
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
            ':a': { BOOL: attending },
        },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
    };

    await client.send(new UpdateItemCommand(itemToUpdate));
};

export const addAttendeeToEvent = async (
    eventId: string,
    userSub: string,
    name: string,
    attending: boolean,
): Promise<void> => {
    const itemToPut = {
        TableName: DYNAMO_TABLE_NAME,
        Item: {
            PK: { S: `event_${eventId}` },
            SK: { S: `attendee_${userSub}` },
            name: { S: name },
            attending: { BOOL: attending },
        },
    };

    await client.send(new PutItemCommand(itemToPut));
};
