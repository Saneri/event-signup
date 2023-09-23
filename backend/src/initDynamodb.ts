import { CreateTableCommand, PutItemCommand, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import dynamo from './dynamodb/client.js';

const DYNAMO_TABLE_NAME = 'eventSignupTable';

const createTable = async () => {
    const params = {
        TableName: DYNAMO_TABLE_NAME,
        KeySchema: [
            { AttributeName: 'PK', KeyType: 'HASH' },
            { AttributeName: 'SK', KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
            { AttributeName: 'PK', AttributeType: 'S' },
            { AttributeName: 'SK', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        // this could be needed later
        /*GlobalSecondaryIndexUpdates: [
            {
                IndexName: 'GSI1',
                KeySchema: [
                    { AttributeName: 'GSI1', KeyType: 'S' },
                    { AttributeName: 'SK', KeyType: 'S' },
                ],
                Projection: {
                    ProjectionType: 'ALL',
                },
            },
        ],*/
    };
    const command = new CreateTableCommand(params);

    try {
        const result = await dynamo.send(command);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

const populateEvents = async () => {
    const itemsToPut = [
        {
            TableName: DYNAMO_TABLE_NAME,
            Item: {
                PK: { S: 'event_1' },
                SK: { S: 'meta' },
                name: { S: 'synttärit' },
                datetime: { S: '2024-03-30T12:00' },
                description: {
                    S: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
            },
        },
        {
            TableName: DYNAMO_TABLE_NAME,
            Item: {
                PK: { S: 'event_2' },
                SK: { S: 'meta' },
                name: { S: 'Joulu' },
                datetime: { S: '2023-12-25T12:00' },
                description: {
                    S: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
            },
        },
        {
            TableName: DYNAMO_TABLE_NAME,
            Item: {
                PK: { S: 'event_3' },
                SK: { S: 'meta' },
                name: { S: 'Uusi vuosi' },
                datetime: { S: '2023-12-31T12:00' },
                description: {
                    S: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
            },
        },
    ];

    itemsToPut.map(async (itemToPut) => {
        const command = new PutItemCommand(itemToPut);

        try {
            await dynamo.send(command);
            console.log('Item added successfully');
        } catch (error) {
            console.error('Error adding item to DynamoDB:', error);
        }
    });
};

const main = async () => {
    await createTable();
    await populateEvents();
};

main();
