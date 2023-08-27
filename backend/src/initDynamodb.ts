import { CreateTableCommand, DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamo = new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'eu-west-1',
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

createTable('YourTableName');

(async () => {
    const result = await client.send(new ListTablesCommand({}));
    console.log(result);
})();
