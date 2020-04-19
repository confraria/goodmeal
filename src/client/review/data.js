import { getClient } from '../data.js';
import { useState, useEffect, useCallback } from 'preact/hooks';

export async function saveReview(review) {
	return await getClient().post('review', { json: review }).json();
}

export async function updateReview(review) {
	return await getClient().post(`review/${review._id}`, { json: review }).json();
}

export async function listReviews({ restaurant, pendingReply }) {
	const path = `review${pendingReply ? '/pendingreply' : ''}`;
	return await getClient().get(path, { searchParams: { restaurant } }).json();
}

export async function replyReview({ id, reply }) {
	return await getClient().post(`review/${id}/reply`, { json: { reply } }).json();
}

export async function deleteReview(id) {
	return await getClient().delete(`review/${id}`).json();
}

export async function getReview(id) {
	return await getClient().get(`review/${id}`).json();
}

export function useReviewsHook({ restaurant, pendingReply }) {
	const [reviews, setReviews] = useState([]);
	const refreshReviews = useCallback(
		() => listReviews({ restaurant, pendingReply }).then(setReviews),
		[restaurant, pendingReply],
	);
	useEffect(refreshReviews, [refreshReviews]);
	const replyReviewAndRefresh = (reply) => replyReview(reply).then(refreshReviews);
	return {
		refreshReviews,
		reviews,
		replyReviewAndRefresh,
	};
}

export function useReviewHook(id, restaurant) {
	const [review, setReview] = useState({ restaurant });
	const refreshReview = useCallback(async () => id && setReview(await getReview(id)), [id]);
	useEffect(() => refreshReview(), [refreshReview]);

	return {
		review,
		setReview,
		refreshReview,
	};
}
