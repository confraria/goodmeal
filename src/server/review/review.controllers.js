import { reviewModel } from './review.model.js';
import { restaurantModel } from '../restaurant/restaurant.model.js';

export async function createReview(req) {
	const review = { ...req.body, reviewer: req.userId };
	return await reviewModel.create(review);
}

export async function listReviews(req) {
	return await reviewModel
		.find({ restaurant: req.query.restaurant })
		.populate({
			path: 'reviewer',
			select: 'name',
		})
		.sort({ createdAt: -1 })
		.lean()
		.exec();
}

export async function listPendingReply(req) {
	const myrestaurants = (
		await restaurantModel.find({ owner: req.user.id }).select('_id').exec()
	).map(({ _id }) => _id);
	return await reviewModel
		.find({ reply: { $exists: false }, restaurant: { $in: myrestaurants } })
		.populate('restaurant');
}

export async function deleteReview(req) {
	const doc = await reviewModel.findById(req.params.id);
	return await doc.remove();
}

export async function updateReview(req) {
	const doc = await reviewModel.findById(req.params.id);
	Object.assign(doc, req.body);
	return await doc.save();
}

export async function replyReview(req, res) {
	const { id } = req.params;
	const review = await reviewModel.findById(id).populate('restaurant').exec();
	if (!review.restaurant.owner.equals(req.userId)) {
		res.status(403);
		return { message: 'Only restaurant owner can reply to reviews' };
	} else if (review.reply) {
		res.status(400);
		return { message: 'Reviews can only be replied once' };
	}
	review.reply = req.body.reply;
	return await review.save();
}
