import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import { useRestaurantsHook } from './data.js';
import { RestaurantListItem } from './restaurant-list-item.jsx';
import { useUserHook } from '../data.js';

export function RestaurantList() {
	const { isOwner } = useUserHook();
	const [filter, setFilter] = useState('');
	const { restaurants, refreshRestaurants } = useRestaurantsHook(filter);
	return (
		<div class="container max-w-screen-lg mx-auto">
			<div className="flex mb-2 p-2 border-b-2 border-gray-200">
				<h1 class="text-2xl flex-1">Restaurants</h1>
				<select value={filter} onChange={(e) => setFilter(e.target.value)}>
					<option value="">All restaurants</option>
					<option value="1">⭐️</option>
					<option value="2">⭐️⭐️</option>
					<option value="3">⭐️⭐️⭐️</option>
					<option value="4">⭐️⭐️⭐️⭐️</option>
					<option value="5">⭐️⭐️⭐️⭐️⭐️</option>
				</select>
				{isOwner && (
					<Link href="/restaurant/new" className="button float-right">
						add restaurant
					</Link>
				)}
			</div>
			{restaurants.map((restaurant) => (
				<RestaurantListItem {...restaurant} onDelete={refreshRestaurants} />
			))}
		</div>
	);
}
