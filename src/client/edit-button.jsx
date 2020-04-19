import { h } from 'preact';

export function EditButton({ className, onClick }) {
	return (
		<button
			onClick={onClick}
			className={`${className} hover:opacity-75 rounded text-xs text-white px-2 bg-blue-500`}
		>
			<PencilIcon />
		</button>
	);
}

function PencilIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			className="my-1 fill-current h-4 w-4"
		>
			<path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
		</svg>
	);
}
