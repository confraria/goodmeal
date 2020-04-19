import { fastify } from '../server.js';
import { connect, disconnect } from '../util/db.js';
import { createUsers, login, clearDb, createRestaurant, getRestaurant } from '../test/utils.js';

let restaurant;

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

beforeEach(async () => {
	restaurant = await createRestaurant(fastify);
});

test('reviews are added', async () => {
	const headers = await login(fastify, 'reviewer');
	const response = await fastify.inject({
		url: '/api/review',
		headers,
		method: 'post',
		payload: {
			restaurant: restaurant._id,
			rating: 3,
			comment: 'this was a good meal',
			visitDate: new Date().toISOString(),
		},
	});
	expect(response.statusCode).toBe(200);

	let refreshRestaurant = await getRestaurant(fastify, restaurant._id);
	expect(refreshRestaurant.averageRating).toBe(3);
	expect(refreshRestaurant.reviews.min).toMatchObject(response.json());
	expect(refreshRestaurant.reviews.max).toMatchObject(response.json());
});
