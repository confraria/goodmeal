import { h } from 'preact';
import { useReviewsHook } from './data';
import { Review } from './review.jsx';

export function ReviewsPendingReply() {
	const { reviews, refreshReviews } = useReviewsHook({ pendingReply: true });
	return (
		<div class={`container max-w-screen-lg mx-auto ${reviews.length || 'hidden'}`}>
			<h1 class="text-2xl flex-1">Reviews waiting reply</h1>
			{reviews.map((rev) => (
				<Review showRestaurant key={rev._id} {...rev} canReply onChange={refreshReviews} />
			))}
		</div>
	);
}
