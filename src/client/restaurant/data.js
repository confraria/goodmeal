import { getClient, useUserHook } from '../data.js';
import { useState, useEffect, useCallback } from 'preact/hooks';

export async function list(searchParams) {
	return await getClient().get('restaurant', { searchParams }).json();
}

export async function detail(id) {
	return await getClient().get(`restaurant/${id}`).json();
}

export async function create(json) {
	return await getClient().post(`restaurant`, { json }).json();
}

export async function remove(id) {
	return await getClient().delete(`restaurant/${id}`).json();
}

export function useRestaurantsHook(rating) {
	const { isOwner, isReviewer, user } = useUserHook();
	const [restaurants, setRestaurants] = useState([]);
	const refreshRestaurants = useCallback(async () => {
		if (user) {
			let query = {};
			if (isOwner) {
				query.mine = true;
			}
			if (isReviewer) {
				query.topRated = true;
			}
			if (rating) {
				query.rating = rating;
			}
			return setRestaurants(await list(query));
		}
	}, [isOwner, isReviewer, user, rating]);
	useEffect(refreshRestaurants, [refreshRestaurants]);
	return {
		restaurants,
		refreshRestaurants,
	};
}

export function useRestaurantHook(id) {
	const [restaurant, setRestaurant] = useState({});
	const refreshRestaurant = useCallback(() => id && detail(id).then(setRestaurant), [id]);
	useEffect(refreshRestaurant, [refreshRestaurant]);
	return {
		restaurant,
		refreshRestaurant,
	};
}
