import { loggedIn, decorateWithUser, withAnyRoles } from '../auth/auth.controllers.js';

import {
	createRestaurant,
	deleteRestaurant,
	updateRestaurant,
	listRestaurants,
	getRestaurant,
} from './restaurant.controllers.js';

export function restaurantRoutes(fastify, opts, done) {
	const onlyAdminOrOwner = withAnyRoles('owner', 'admin');

	fastify.get('/', { preHandler: [loggedIn, decorateWithUser] }, listRestaurants);
	fastify.post('/', { preHandler: onlyAdminOrOwner }, createRestaurant);
	fastify.get('/:id', { preHandler: loggedIn }, getRestaurant);
	fastify.post('/:id', { preHandler: onlyAdminOrOwner }, updateRestaurant);
	fastify.delete('/:id', { preHandler: onlyAdminOrOwner }, deleteRestaurant);

	done();
}
