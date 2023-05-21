import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamo = new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'eu-west-1',
});
const client = DynamoDBDocument.from(dynamo);

// TODO: add items to local db
(async () => {
    const result = await client.send(new ListTablesCommand({}));
    console.log(result);
})();
