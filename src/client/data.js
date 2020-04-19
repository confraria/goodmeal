import ky from 'ky';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';

let client = ky.extend({ prefixUrl: '/api/' });
let initialization = initToken();
let userListeners = [];
let globalUser;

export async function authenticate(email, pwd) {
	const { token } = await client.post('auth', { json: { email, pwd } }).json();
	await setToken(token);
}

export function logout() {
	localStorage.removeItem('token');
	globalUser = undefined;
	client = ky.extend({ prefixUrl: '/api/' });
	userListeners.forEach((fn) => fn(globalUser));
	route('/login');
}

export async function register(json) {
	return await client.post('user/register', { json }).json();
}

export async function handleRoute(e) {
	await initialization;
	const unAuthPaths = ['register', 'login'];
	const isUnAuthPath = unAuthPaths.some((r) => `/${r}` === e.url);
	if (!globalUser && !isUnAuthPath) {
		route('/login', true);
	}
	if (globalUser && isUnAuthPath) {
		route('/', true);
	}
}

async function setToken(token) {
	let tmpclient = client.extend({ headers: { authorization: `bearer ${token}` } });
	globalUser = await tmpclient.get('user/current').json();
	localStorage.setItem('token', token);
	client = tmpclient;
	userListeners.forEach((fn) => fn(globalUser));
}

async function initToken() {
	const savedToken = localStorage.getItem('token');
	if (savedToken) {
		return setToken(savedToken).then(
			() => globalUser,
			() => localStorage.removeItem('token'),
		);
	}
}

export function getClient() {
	return client;
}

export function useUserHook() {
	let [user, setUser] = useState(globalUser);
	useEffect(() => {
		const listener = setUser;
		userListeners.push(listener);
		return () => {
			const ix = userListeners.indexOf(listener);
			userListeners.splice(ix, 1);
		};
	}, []);
	let rolesProps = {};
	if (user && user.roles) {
		user.roles.forEach((r) => {
			rolesProps[`is${r[0].toUpperCase()}${r.substr(1)}`] = true;
		});
	}

	return {
		user,
		...rolesProps,
	};
}

export function useReadyHook() {
	const [ready, setReady] = useState(false);
	useEffect(() => initialization.then(() => setReady(true)), []);
	return { ready };
}
