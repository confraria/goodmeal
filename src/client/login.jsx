import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { authenticate } from './data';
import { Link } from 'preact-router';
import { Alerts } from './alerts.jsx';

export function Login({ onLogin }) {
	const [alerts, setAlerts] = useState([]);
	const emailRef = useRef();
	const passwordRef = useRef();
	const onSubmit = async (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		setAlerts([]);
		try {
			await authenticate(email, password);
			onLogin();
		} catch (e) {
			setAlerts([...alerts, ['Invalid credentials']]);
		}
	};

	return (
		<div className="flex items-center min-h-screen">
			<div className="w-full max-w-sm mx-auto my-5">
				<form onSubmit={onSubmit} className="bg-white shadow-md rounded px-5 pb-5">
					<h1 className="text-6xl text-orange-500 text text-center">goodmeal</h1>
					<div className="mb-5">
						<label className="label" for="email">
							E-mail
						</label>
						<input className="field" required type="email" ref={emailRef} id="email" />
					</div>
					<div className="mb-5">
						<label className="label" for="password">
							Password
						</label>
						<input className="field" required ref={passwordRef} id="password" type="password" />
					</div>
					<div className="mb-5">
						<button className="button w-full mb-2">Login</button>
						<Link href="/register" className="block text-base text-blue-500 underline text-center">
							create a new account
						</Link>
					</div>
					<Alerts alerts={alerts} onAlerts={setAlerts} />
				</form>
			</div>
		</div>
	);
}
