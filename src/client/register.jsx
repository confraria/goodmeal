import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { register } from './data.js';
import { Link } from 'preact-router';

export function Register({ onRegister }) {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const roleRef = useRef();

	const onSubmit = async (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const pwd = passwordRef.current.value;
		const roles = [roleRef.current.value];
		try {
			await register({ name, email, pwd, roles });
			onRegister();
		} catch (e) {}
	};

	return (
		<div className="flex items-center min-h-screen">
			<div className="w-full max-w-sm mx-auto my-5">
				<form onSubmit={onSubmit} className="bg-white shadow-md rounded px-5 pb-5">
					<h1 className="text-6xl text-orange-500 text text-center">goodmeal</h1>
					<div className="mb-5">
						<label className="label" for="name">
							Name
						</label>
						<input className="field" ref={nameRef} id="name" />
					</div>
					<div className="mb-5">
						<label className="label" type="email" for="email">
							E-mail
						</label>
						<input className="field" ref={emailRef} id="email" />
					</div>
					<div className="mb-5">
						<label className="label" for="password">
							Password
						</label>
						<input className="field" ref={passwordRef} id="password" type="password" />
					</div>
					<div className="mb-5">
						<label className="label" for="password">
							Role
						</label>
						<select class="field" ref={roleRef}>
							<option value="reviewer">Reviewer</option>
							<option value="owner">Restaurant owner</option>
							<option value="admin">Administrator</option>
						</select>
					</div>

					<div className="mb-5">
						<button className="button w-full mb-2">Create user</button>
						<Link href="/login" className="block text-base text-blue-500 underline text-center">
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
