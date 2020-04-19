import createFastify from 'fastify';
import { userRoutes } from './user/user.route.js';
import { restaurantRoutes } from './restaurant/restaurant.route.js';
import { connect } from './util/db.js';
import config from './config/index.js';
import { authHandler } from './auth/auth.controllers.js';
import { reviewRoutes } from './review/review.routes.js';

export const fastify = createFastify({
	trustProxy: true,
	logger: config.logger,
});
fastify.register(
	(fastify, options, done) => {
		fastify.post('/auth', authHandler);
		fastify.register(userRoutes, { prefix: '/user' });
		fastify.register(restaurantRoutes, { prefix: '/restaurant' });
		fastify.register(reviewRoutes, { prefix: '/review' });
		done();
	},
	{ prefix: '/api' },
);

fastify.setErrorHandler(function (error, req, rep) {
	fastify.log.error(error);
	let msg = config.isProduction ? { message: 'Server error' } : error;
	if (error.name === 'ValidationError') {
		rep.status(400).send({ message: error.message });
	} else {
		rep.status(500).send(msg);
	}
});

export const start = async () => {
	try {
		await connect();
		await fastify.listen(config.port, '0.0.0.0');
		fastify.log.info(`server listening on ${fastify.server.address().port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
