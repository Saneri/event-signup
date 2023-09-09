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
        },
    };

    const command = new PutItemCommand(itemToPut);

    try {
        const result = await dynamo.send(command);
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
