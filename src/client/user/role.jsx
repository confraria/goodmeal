import { h } from 'preact';

export function Role({ role }) {
	const colors = {
		admin: 'bg-green-500',
		reviewer: 'bg-blue-500',
		owner: 'bg-purple-500',
	};
	return (
		<div className={`inline-block text-xs px-1 ${colors[role] || 'bg-gray-500'} text-white`}>
			{role}
		</div>
	);
}
