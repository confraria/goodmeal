import mongoose from 'mongoose';
import { userModel } from '../user/user.model.js';

export async function createUsers() {
	const users = ['reviewer', 'admin', 'owner'].map((r) => ({
		roles: [r],
		name: `John ${r}`,
		pwd: '1234',
		email: `${r}@example.com`,
	}));
	return userModel.create(users);
}

export async function login(fastify, role) {
	const response = await fastify.inject({
		method: 'post',
		url: '/api/auth',
		payload: {
			email: `${role}@example.com`,
			pwd: '1234',
		},
	});
	return {
		Authorization: `bearer ${response.json().token}`,
	};
}

export async function clearDb() {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany();
	}
}

export async function createRestaurant(fastify) {
	const headers = await login(fastify, 'owner');
	const response = await fastify.inject({
		method: 'post',
		url: '/api/restaurant',
		headers,
		payload: {
			name: 'My restaurant',
		},
	});
	return response.json();
}

export async function getRestaurant(fastify, id) {
	const headers = await login(fastify, 'reviewer');
	const response = await fastify.inject({
		url: `/api/restaurant/${id}`,
		headers,
	});
	return response.json();
}
