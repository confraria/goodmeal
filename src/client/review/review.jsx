import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Stars } from '../stars.jsx';
import { DeleteButton } from '../delete-button.jsx';
import { deleteReview, replyReview } from './data.js';
import { EditButton } from '../edit-button.jsx';
import { route } from 'preact-router';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});
export function Review({
	_id,
	canReply,
	canEdit,
	canDelete,
	comment,
	rating,
	visitDate,
	reply,
	reviewer,
	showRestaurant,
	restaurant,
	onChange,
}) {
	const onDelete = async () => {
		await deleteReview(_id);
		onChange();
	};
	return (
		<div className="rounder bg-gray-100 p-2 mb-2 relative">
			<div className="absolute top-0 right-0 p-3">
				{canEdit && <EditButton className="mr-2" onClick={() => route(`/review/${_id}/edit`)} />}
				{canDelete && <DeleteButton onDelete={onDelete} />}
			</div>
			<div className="flex">
				<div className="flex-grow">
					<Stars rating={rating} />
				</div>
				{showRestaurant && <div className="text-gray-400">{restaurant.name}</div>}
			</div>
			<p class="text-base text-gray-600">{comment}</p>
			<span class="text-sm italic text-gray-400">
				{reviewer?.name} visited on {dateFormatter.format(new Date(visitDate))}
			</span>

			{reply ? (
				<p className="italic rounded text-sm text-gray-600 bg-gray-200 ml-5 p-2">{reply}</p>
			) : (
				canReply && <ReplyForm id={_id} onReply={onChange} />
			)}
		</div>
	);
}

function ReplyForm({ onReply, id }) {
	const [reply, setReply] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (reply) {
			await replyReview({ id, reply });
			onReply(reply);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="mt-1 ml-5">
			<div className="">
				<textarea
					className="field"
					value={reply}
					required
					onChange={(e) => setReply(e.target.value)}
					id="comment"
				/>
			</div>
			<div className="flex justify-end">
				<button className="button small">Reply</button>
			</div>
		</form>
	);
}
