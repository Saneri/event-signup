import { CreateTableCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamo from './dynamodb/client.js';

const createTable = async (tableName: string) => {
    const params = {
        TableName: tableName,
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
    };
    const command = new CreateTableCommand(params);

    try {
        const result = await dynamo.send(command);
        console.log('Table created successfully:', result);
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

const populateEventTable = async () => {
    const itemToPut = {
        TableName: 'event',
        Item: {
            id: { S: '1' },
            name: { S: 'synttärit' },
            datetime: { S: '2024-03-30T12:00' },
            description: {
                S: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
        },
    };

    const command = new PutItemCommand(itemToPut);

    try {
        await dynamo.send(command);
        console.log('Item added successfully');
    } catch (error) {
        console.error('Error adding item to DynamoDB:', error);
    }
};

const main = async () => {
    await createTable('event');
    await populateEventTable();
};

main();
