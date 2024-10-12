import {
    AttributeValue,
    BatchGetItemCommand,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { randomBytes, randomUUID } from 'crypto';
import { DynamoEvent } from '../api/types';
import client, { DYNAMO_TABLE_NAME } from './client';

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
    const eventKey = randomBytes(5).toString('hex'); // generates an URL friendly random string of length 10

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
            key: { S: eventKey },
        },
    };

    if (body.expiryTimestamp) {
        itemToPut.Item.expiryTimestamp = { S: body.expiryTimestamp };
    }

    await client.send(new PutItemCommand(itemToPut));
    return eventId;
};
