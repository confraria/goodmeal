import { h } from 'preact';
import { saveReview, updateReview, useReviewHook } from './data';
import { Stars } from '../stars.jsx';
import { route } from 'preact-router';
import { useUserHook } from '../data';
import { useRestaurantHook } from '../restaurant/data';

export function ReviewEditor({ restaurant, id }) {
	const { isAdmin } = useUserHook();
	const { review, setReview } = useReviewHook(id, restaurant);
	const {
		restaurant: { name: restaurantName },
	} = useRestaurantHook(review.restaurant || restaurant);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await (id ? updateReview(review) : saveReview(review));
		const restaurantId = restaurant || review.restaurant;
		route(`/restaurant/${restaurantId}`);
	};
	const setRating = (rating) => setReview({ ...review, rating });
	const onChange = (e) => {
		const { name, value } = e.target;
		setReview({ ...review, [name]: value });
	};
	const cancel = () => route(`/restaurant/${restaurant || review.restaurant}`);

	return (
		<div className="container max-w-screen-lg mx-auto">
			<div className="block bg-white shadow-sm rounded px-5 py-5 mb-5">
				<h1 className="text-4xl">{restaurantName}</h1>
				<form onSubmit={handleSubmit} className="mt-10">
					<Stars interact onRating={setRating} rating={review.rating} />
					<div className="mb-5">
						<label className="label" for="comment">
							Comment
						</label>
						<textarea
							name="comment"
							value={review.comment}
							onChange={onChange}
							className="field"
							required
							id="comment"
						/>
					</div>
					<div className="mb-5">
						<label className="label" for="date">
							Date of your visit
						</label>
						<input
							name="visitDate"
							valueAsNumber={review.visitDate && new Date(review.visitDate).valueOf()}
							onChange={onChange}
							className="field"
							required
							type="date"
							id="date"
						/>
					</div>
					{isAdmin && (
						<div className="mb-5">
							<label className="label" for="reply">
								Reply
							</label>
							<textarea
								name="reply"
								onChange={onChange}
								value={review.reply}
								className="field"
								id="reply"
							/>
						</div>
					)}
					<div className="mb-5 flex justify-end">
						<button type="button" className="button white mr-1" onClick={cancel}>
							Cancel
						</button>{' '}
						<button className="button">Save review</button>
					</div>
				</form>
			</div>
		</div>
	);
}
