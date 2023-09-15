import { APIGatewayProxyResult } from 'aws-lambda';
import { getAllEvents } from './../dynamodb/client.js';

const eventsGet = async (): Promise<APIGatewayProxyResult> => {
    try {
        const events = await getAllEvents();

        if (!events) {
            return {
                statusCode: 200,
                body: '[]',
            };
        }

        const data: Record<string, any> = events.map((item) => {
            const transformedItem: Record<string, any> = {};
            Object.keys(item).forEach((key) => {
                transformedItem[key] = item[key].S;
            });
            return transformedItem;
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
