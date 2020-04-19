import { h } from 'preact';
import { useState } from 'preact/hooks';

export function Stars({ rating = 1, big, interact, max = 5, onRating }) {
	const [mouseInside, setMouseInside] = useState(false);
	const [ratingUser, setRatingUser] = useState(0);
	const stars = Array.from({ length: max });
	const onMouseEnter = () => interact && setMouseInside(true);
	const onMouseLeave = () => interact && setMouseInside(false);
	const onMouseEnterStar = (ix) => interact && setRatingUser(ix);
	const onClickStar = (ix) => interact && onRating(ix + 1);
	const ratingRender = mouseInside ? ratingUser : Math.round(rating) - 1;
	return (
		<div className="relative inline-block" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{stars.map((_, ix) => (
				<Star
					big={big}
					interact={interact}
					onClick={() => onClickStar(ix)}
					onMouseEnter={() => onMouseEnterStar(ix)}
					color={ix <= ratingRender ? 'text-yellow-500' : 'text-gray-200'}
				/>
			))}
		</div>
	);
}

function Star({ color, interact, big, onMouseEnter, onClick }) {
	const interactClasses = interact ? 'cursor-pointer hover:opacity-75' : '';
	const sizeClasses = interact || big ? 'h-10 w-10' : 'h-4 w-4';
	return (
		<svg
			onMouseEnter={onMouseEnter}
			onClick={onClick}
			className={`fill-current ${color} ${interactClasses} ${sizeClasses} inline-block`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
		>
			<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
		</svg>
	);
}
