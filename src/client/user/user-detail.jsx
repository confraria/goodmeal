import { h } from 'preact';
import { useUserHook, updateOrCreateUser } from './data.js';

export function UserDetail({ id, onSave = () => null }) {
	const { user, setUser } = useUserHook(id);
	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		await updateOrCreateUser(user);
		onSave();
	};

	return (
		<div className="container max-w-screen-xl mx-auto">
			<form onSubmit={onSubmit} className="bg-white shadow-md rounded px-5 py-5">
				<div className="mb-5">
					<label className="label" for="name">
						Name
					</label>
					<input
						className="field"
						required
						name="name"
						value={user.name}
						onChange={onChange}
						id="name"
					/>
				</div>
				<div className="mb-5">
					<label className="label" for="email">
						E-mail
					</label>
					<input
						className="field"
						type="email"
						required
						name="email"
						value={user.email}
						onChange={onChange}
						id="email"
					/>
				</div>
				<div className="mb-5">
					<label className="label" for="password">
						Password
					</label>
					<input
						className="field"
						name="pwd"
						value={user.pwd}
						onChange={onChange}
						required={!id}
						id="password"
						type="password"
					/>
				</div>
				<div className="mb-5">
					<label className="label" for="role">
						Role
					</label>
					<select class="field" id="role" name="role" value={user.role} onChange={onChange}>
						<option value="reviewer">Reviewer</option>
						<option value="owner">Restaurant owner</option>
						<option value="admin">Administrator</option>
					</select>
				</div>

				<div className="mb-5">
					<button className="button w-full mb-2">Save user</button>
				</div>
			</form>
		</div>
	);
}
