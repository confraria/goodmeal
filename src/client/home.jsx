import { h, Fragment } from 'preact';

import { RestaurantList } from './restaurant/restaurant-list.jsx';
import { useUserHook } from './data.js';
import { ReviewsPendingReply } from './review/reviews-pending-reply.jsx';

export function Home() {
	const { isOwner } = useUserHook();
	return (
		<Fragment>
			{isOwner && <ReviewsPendingReply />}
			<RestaurantList />
		</Fragment>
	);
}
