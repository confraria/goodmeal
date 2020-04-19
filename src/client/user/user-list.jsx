import { h } from 'preact';
import { useUsersHook } from './data.js';
import { UserListItem } from './user-list-item.jsx';
import { route, Link } from 'preact-router';

export function UserList() {
	const { users, refreshUsers } = useUsersHook();

	return (
		<div class="container max-w-screen-lg mx-auto">
			<div className="flex mb-2 p-2 border-b-2 border-gray-200">
				<h1 class="text-2xl flex-1">Users</h1>
				<Link href="/user/new" className="button float-right">
					add user
				</Link>
			</div>
			{users.map((u) => (
				<UserListItem
					key={u._id}
					user={u}
					onDelete={refreshUsers}
					onClick={() => route(`/user/${u._id}`)}
				/>
			))}
		</div>
	);
}
