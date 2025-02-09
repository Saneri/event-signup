import request from 'supertest';
import { getEventById } from '../dynamodb/eventService';

// Todo: spin up backend and db before running tests if not yet running

describe('Create event', () => {
    test('create succesfully', async () => {
        const response = await request('http://localhost:3001')
            .post('/events')
            .send({
                name: 'Birthday Party',
                datetime: '2022-01-01T00:00:00.000Z',
                description: 'The greatest party ever',
                expiryTimestamp: null,
            })
            .set('Authorization', 'Bearer your-token');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('eventId');

        const result = await getEventById('e6d63350-83b1-4f00-9ffd-01365ca55860');

        expect(result?.name.S).toBe('Birthday Party');
    });
});
