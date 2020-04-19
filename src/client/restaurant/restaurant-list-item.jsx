import { h } from 'preact';
import { Link } from 'preact-router';
import { Stars } from '../stars.jsx';
import { remove } from './data.js';
import { DeleteButton } from '../delete-button.jsx';
import { useUserHook } from '../data.js';

export function RestaurantListItem({ owner, name, _id, averageRating, onDelete }) {
	const { isAdmin, user } = useUserHook();
	const onClickDelete = async (e) => {
		await remove(_id);
		onDelete(_id);
	};
	const canDelete = isAdmin || owner === user._id;
	return (
		<Link
			href={`/restaurant/${_id}`}
			className="block bg-white shadow-sm rounded px-5 py-5 mb-5 cursor-pointer hover:shadow-md relative"
		>
			<div className="absolute top-0 right-0 pr-3">
				{canDelete && <DeleteButton onDelete={onClickDelete} />}
			</div>
			<h1 className="text-xl">{name}</h1>
			<Stars rating={averageRating} />
		</Link>
	);
}
