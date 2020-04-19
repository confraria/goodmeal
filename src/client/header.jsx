import { h } from 'preact';
import { Link } from 'preact-router';
import { logout, useUserHook } from './data.js';
import { Role } from './user/role.jsx';

export function Header() {
	const { user, isAdmin } = useUserHook();
	const className = 'text-white underline px-2 hover:opacity-50 cursor-pointer';
	return (
		<div className="bg-orange-500 flex items-center p-2">
			<h1 className="text-3xl text-white flex-1">goodmeal</h1>
			{isAdmin && (
				<Link href="/users" className={className}>
					Users
				</Link>
			)}
			<Link href="/" className={className}>
				Restaurants
			</Link>
			<div className="ml-2 text-white opacity-50 text-sm hidden md:block">{user?.email}</div>
			<div className="ml-1">
				{user?.roles.map((r) => (
					<Role role={r} />
				))}
			</div>
			<a href="javascript:;" className={className} onClick={logout}>
				Logout
			</a>
		</div>
	);
}
