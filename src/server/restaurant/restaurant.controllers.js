import { restaurantModel } from './restaurant.model.js';

export async function getRestaurant(req) {
	return await restaurantModel
		.findById(req.params.id)
		.populate('reviews.max')
		.populate('reviews.min')
		.lean()
		.exec();
}

export async function createRestaurant(req) {
	return await restaurantModel.create({
		...req.body,
		owner: req.userId,
	});
}

export async function listRestaurants(req) {
	let filter = {};
	if (req.query.mine) {
		filter.owner = req.user.id;
	}
	if (req.query.rating) {
		filter.averageRating = { $gte: req.query.rating };
	}
	let query = restaurantModel.find(filter);
	console.log(filter);
	if (req.query.topRated) {
		query = query.sort('-averageRating');
	}
	if (req.query.limit) {
		query = query.limit(req.query.limit);
	}
	return query.lean().exec();
}

async function hasPermission(req, res) {
	const { roles, id } = req.user;
	const isAdmin = roles.includes('admin');
	const restaurant = await restaurantModel.findById(req.params.id);
	if (!restaurant) {
		res.status(404).send({ message: 'resource not available' });
		return;
	} else if (!isAdmin && !restaurant.owner.equals(id)) {
		res.status(403).send({ message: 'no permission to access resource' });
		return;
	}
	return restaurant;
}

export async function updateRestaurant(req) {
	const restaurant = await hasPermission(req);
	if (restaurant) return restaurant.update(req.body).exec();
}

export async function deleteRestaurant(req, res) {
	const restaurant = await hasPermission(req, res);
	if (restaurant) {
		await restaurant.remove();
		return { ok: true };
	}
	return;
}
