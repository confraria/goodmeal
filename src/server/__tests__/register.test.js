import { fastify } from '../server.js';
import { connect, disconnect } from '../util/db.js';
import { clearDb } from '../test/utils';

beforeAll(async () => {
	await connect();
	await fastify.ready();
});
afterAll(async () => {
	await clearDb();
	await disconnect();
	fastify.close();
});

test('registers user', async () => {
	await fastify.ready();
	const newUser = {
		email: 'random@gmail.com',
		pwd: '1234',
		name: 'john doe',
		roles: ['admin'],
	};
	const response = await fastify.inject({
		method: 'POST',
		url: '/api/user/register',
		payload: newUser,
	});
	const res = response.json();
	expect(response.statusCode).toBe(200);
	expect(res._id).toBeTruthy();
});

test('error on duplicate users user', async () => {
	await fastify.ready();
	const newUser = {
		email: 'random@gmail.com',
		pwd: '1234',
		name: 'john doe',
		roles: ['admin'],
	};
	await fastify.inject({
		method: 'POST',
		url: '/api/user/register',
		payload: newUser,
	});
	const response = await fastify.inject({
		method: 'POST',
		url: '/api/user/register',
		payload: newUser,
	});
	expect(response.statusCode).toBe(400);
	expect(response.json()).toMatchObject({ message: 'E-mail already registered' });
});
