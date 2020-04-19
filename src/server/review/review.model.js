import mongoose from 'mongoose';
import { restaurantModel } from '../restaurant/restaurant.model.js';

const reviewSchema = mongoose.Schema(
	{
		restaurant: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'restaurant',
			required: true,
		},
		reviewer: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true,
		},
		rating: {
			type: Number,
			min: 0,
			max: 5,
			required: true,
		},
		visitDate: {
			type: Date,
			required: true,
		},
		comment: {
			type: String,
		},
		reply: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

reviewSchema.post('save', updateRestaurant);
reviewSchema.post('remove', updateRestaurant);
reviewSchema.index({ restaurant: 1, author: 1 });

export const reviewModel = mongoose.model('review', reviewSchema);

const average = async (restaurant) => {
	const [{ averageRating }] = await reviewModel
		.aggregate([
			{ $match: { restaurant: mongoose.Types.ObjectId(restaurant) } },
			{ $group: { _id: null, averageRating: { $avg: '$rating' } } },
		])
		.exec();
	return averageRating;
};

const edge = async (restaurant, isMax) => {
	const [{ _id }] = await reviewModel
		.aggregate([
			{ $match: { restaurant: mongoose.Types.ObjectId(restaurant) } },
			{ $sort: { rating: isMax ? -1 : 1, createdAt: -1, visitDate: -1 } },
			{ $limit: 1 },
		])
		.exec();
	return _id;
};

async function updateRestaurant() {
	const { restaurant } = this;
	const restaurantId = restaurant._id || restaurant;
	const [averageRating, max, min] = await Promise.all([
		average(restaurantId),
		edge(restaurantId, true),
		edge(restaurantId, false),
	]);
	await restaurantModel.findByIdAndUpdate(restaurant, { averageRating, reviews: { max, min } });
}
