import { fastify } from '../server.js';
import { connect, disconnect } from '../util/db.js';
import { createUsers, login, clearDb } from '../test/utils.js';

beforeAll(async () => {
	await connect();
	await fastify.ready();
	await createUsers();
});
afterAll(async () => {
	await clearDb();
	await disconnect();
	fastify.close();
});

test('owners create restaurants', async () => {
	const headers = await login(fastify, 'owner');
	const response = await fastify.inject({
		path: '/api/restaurant',
		method: 'post',
		headers,
		payload: {
			name: 'My restaurant',
		},
	});
	expect(response.json()).toMatchObject({
		name: 'My restaurant',
		_id: expect.stringMatching(/.+/),
	});
	expect(response.statusCode).toBe(200);
});

test('reviews cannot create restaurants', async () => {
	const headers = await login(fastify, 'reviewer');
	const response = await fastify.inject({
		path: '/api/restaurant',
		method: 'post',
		headers,
		payload: {
			name: 'My restaurant',
		},
	});
	expect(response.statusCode).toBe(403);
});
