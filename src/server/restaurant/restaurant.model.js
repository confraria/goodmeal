import mongoose from 'mongoose';
import { reviewModel } from '../review/review.model.js';

const restaurantSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true,
		},
		averageRating: {
			type: Number,
			min: 0,
			max: 5,
			default: 0,
		},
		reviews: {
			min: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'review',
			},
			max: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'review',
			},
		},
	},
	{
		timestamps: true,
	},
);

restaurantSchema.index({ owner: 1, averageRating: -1 });

restaurantSchema.post('remove', function () {
	reviewModel.deleteMany({ owner: this.id });
});

export const restaurantModel = mongoose.model('restaurant', restaurantSchema);
