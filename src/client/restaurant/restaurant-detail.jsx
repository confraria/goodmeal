import { h } from 'preact';
import { Link } from 'preact-router';
import { useReviewsHook } from '../review/data.js';
import { Review } from '../review/review.jsx';
import { useRestaurantHook } from './data.js';
import { Stars } from '../stars.jsx';
import { useUserHook } from '../data.js';

export function RestaurantDetail({ id }) {
	const { reviews, refreshReviews } = useReviewsHook({ restaurant: id });
	const { restaurant, refreshRestaurant } = useRestaurantHook(id);
	const { user, isAdmin, isReviewer } = useUserHook();
	const onChange = () => {
		refreshReviews(), refreshRestaurant();
	};
	let best = restaurant?.reviews?.max;
	let worst = restaurant?.reviews?.min;
	if (best && worst) {
		if (best._id === worst._id) {
			if (best.rating > 2.5) {
				worst = null;
			} else {
				best = null;
			}
		}
	}

	const canReply = (restaurant || {}).owner === user._id;
	return (
		<div className="container max-w-screen-lg mx-auto">
			<div className="block bg-white shadow-sm rounded px-5 py-5 mb-5">
				<div className="flex ">
					<div className="flex-1 pb-2">
						<h1 className="text-4xl">{restaurant.name}</h1>
						<Stars big rating={restaurant.averageRating} />
					</div>
					{isReviewer && (
						<Link href={`/review/${id}/new`} className="button self-start">
							add review
						</Link>
					)}
				</div>

				{best && (
					<div className="bg-green-300 px-2 pb-1">
						<h1 className="text-green-800 py-1">😃 Best review</h1>
						<Review {...best} />
					</div>
				)}

				{worst && (
					<div className="bg-red-300 px-2 pb-1">
						<h1 className="text-red-800  py-1">🤮 Worst review</h1>
						<Review {...worst} />
					</div>
				)}

				{reviews.length === 0 && <h1 className="text-center p-5">No reviews available yet.</h1>}

				<div className="mt-5">
					{reviews.map((rev) => (
						<Review
							key={rev._id}
							{...rev}
							canEdit={isAdmin}
							canDelete={isAdmin}
							canReply={canReply}
							onChange={onChange}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
