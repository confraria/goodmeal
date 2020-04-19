import { getClient } from '../data.js';
import { useState, useEffect, useCallback } from 'preact/hooks';

export async function updateUser(user) {
	return await getClient().post(`user/${user._id}`, { json: user }).json();
}

export async function createUser(json) {
	return await getClient().post('user/register', { json }).json();
}

export async function updateOrCreateUser(user) {
	return user._id ? updateUser(user) : createUser(user);
}

export async function listUsers() {
	return await getClient().get('user').json();
}

export async function deleteUser(id) {
	return await getClient().delete(`user/${id}`).json();
}

export async function getUser(id) {
	return await getClient().get(`user/${id}`).json();
}

export function useUsersHook() {
	const [users, setUsers] = useState([]);
	const refreshUsers = useCallback(() => listUsers(users).then(setUsers), []);
	useEffect(refreshUsers, []);

	return {
		refreshUsers,
		users,
	};
}

export function useUserHook(id) {
	const [user, _setUser] = useState({});
	const refreshUser = useCallback(() => id && getUser(id).then(setUser), [id]);
	useEffect(refreshUser, [id]);
	const setUser = (u) => {
		const { roles = ['reviewer'] } = u;
		u.roles = [u.role || roles[0]];
		if (!u.role) u.role = u.roles[0];
		_setUser(u);
	};

	return {
		refreshUser,
		user,
		setUser,
	};
}
