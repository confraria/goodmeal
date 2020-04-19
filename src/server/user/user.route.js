import { register, getCurrentUser, updateCurrentUser } from './user.controllers.js';
import { loggedIn, withRoles } from '../auth/auth.controllers.js';
import { deleteModel, listModel, getModel, updateModel } from '../util/crud.js';
import { userModel } from './user.model.js';

export function userRoutes(fastify, opts, done) {
	fastify.post('/register', register);

	fastify.get('/current', { preHandler: loggedIn }, getCurrentUser);
	fastify.post('/current', { preHandler: loggedIn }, updateCurrentUser);

	fastify.get('/', { preHandler: withRoles('admin') }, listModel(userModel, { pwd: 0 }));
	fastify.get('/:id', { preHandler: withRoles('admin') }, getModel(userModel, { pwd: 0 }));
	fastify.post('/:id', { preHandler: withRoles('admin') }, updateModel(userModel, { pwd: 0 }));
	fastify.delete('/:id', { preHandler: withRoles('admin') }, deleteModel(userModel));

	done();
}
