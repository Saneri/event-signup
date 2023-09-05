import { CreateTableCommand, DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamo = new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'localhost',
});
const client = DynamoDBDocument.from(dynamo);

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
        const result = await client.send(command);
        console.log('Table created successfully:', result);
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

const populateEventTable = async () => {
    const itemToPut = {
        TableName: 'event',
        Item: {
            id: '1',
            name: 'synttärit',
        },
    };

    try {
        const result = await client.put(itemToPut);
        console.log('Item added successfully:', result);
    } catch (error) {
        console.error('Error adding item to DynamoDB:', error);
    }
};

const main = async () => {
    await createTable('event');
    await populateEventTable();
};

main();
