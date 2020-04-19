import { h } from 'preact';
import { deleteUser } from './data.js';
import { Role } from './role.jsx';
import { DeleteButton } from '../delete-button.jsx';

export function UserListItem({ user, onClick, onDelete }) {
	const onClickDelete = async () => {
		await deleteUser(user._id);
		onDelete(user);
	};
	return (
		<div
			onClick={onClick}
			class="flex block items-center bg-white shadow-sm rounded px-2 py-2 mb-2 cursor-pointer hover:shadow-md"
		>
			<p class="text-lg mr-3">{user.name}</p>
			<p class="text-sm text-gray-400 flex-1">{user.email}</p>
			<div>
				{user.roles.map((r) => (
					<Role role={r} />
				))}
			</div>
			<div class="ml-2">
				<DeleteButton onDelete={onClickDelete} />
			</div>
		</div>
	);
}
