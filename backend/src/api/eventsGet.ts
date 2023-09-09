import { ScanCommand, ScanCommandInput, ScanCommandOutput } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import dynamo from './../dynamodb/client.js';

const eventsGet = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const params: ScanCommandInput = {
            TableName: 'event',
        };
        const scanCommand = new ScanCommand(params);
        const result: ScanCommandOutput = await dynamo.send(scanCommand);

        if (!result.Items) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'No events found',
                }),
            };
        }

        const data = result.Items.map((item) => {
            const transformedItem: Record<string, any> = {};
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    transformedItem[key] = item[key].S;
                }
                return transformedItem;
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};

export default eventsGet;
