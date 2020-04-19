import { loggedIn, withRoles } from '../auth/auth.controllers.js';
import {
	listReviews,
	createReview,
	updateReview,
	deleteReview,
	replyReview,
	listPendingReply,
} from './review.controllers.js';
import { getModel } from '../util/crud.js';
import { reviewModel } from './review.model.js';

export function reviewRoutes(fastify, opts, done) {
	fastify.get('/', { preHandler: loggedIn }, listReviews);
	fastify.post('/', { preHandler: loggedIn }, createReview);
	fastify.get('/pendingreply', { preHandler: withRoles('owner') }, listPendingReply);
	fastify.get('/:id', { preHandler: withRoles('admin') }, getModel(reviewModel));
	fastify.post('/:id', { preHandler: withRoles('admin') }, updateReview);
	fastify.post('/:id/reply', { preHandler: withRoles('owner') }, replyReview);
	fastify.delete('/:id', { preHandler: withRoles('admin') }, deleteReview);

	done();
}
