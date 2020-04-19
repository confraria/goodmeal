import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export function DeleteButton({ onDelete }) {
	const [confirming, setConfirming] = useState(false);
	useEffect(() => {
		const id = confirming && setTimeout(() => setConfirming(false), 3000);
		() => clearTimeout(id);
	}, [confirming]);
	const onClickDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!confirming) {
			setConfirming(true);
		} else {
			onDelete();
		}
	};
	let body = confirming ? 'Are you sure?' : <TrashIcon />;
	return (
		<button
			onClick={onClickDelete}
			className="hover:opacity-75 rounded text-xs text-white px-2 bg-red-500"
		>
			{body}
		</button>
	);
}

function TrashIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			className="my-1 fill-current h-4 w-4"
		>
			<path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
		</svg>
	);
}
