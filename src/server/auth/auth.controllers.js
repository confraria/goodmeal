import { userModel } from '../user/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const { secret, expiresIn } = config.jwt;

export async function authHandler(req, res) {
	const { email, pwd } = req.body;
	const user = await userModel.findOne({ email }).exec();
	if (user) {
		const passwordCorrect = await user.checkPassword(pwd);
		if (passwordCorrect) {
			const token = newToken(user);
			res.status(200).header('x-auth-token', token).send({ token });
		}
	}
	res.status(401).send({ message: 'Invalid email or password' });
}

export async function decorateWithUserId(req, res) {
	const { authorization } = req.headers;
	if (authorization) {
		const [, token] = authorization.match(/bearer\s+(.*)$/i) || [];
		if (token) {
			const { id } = await new Promise((resolve) => {
				jwt.verify(token, secret, (err, payload) => {
					resolve(payload || {});
				});
			});
			if (id) {
				req.userId = id;
			}
		}
	}
	return res;
}

export async function decorateWithUser(req) {
	await decorateWithUserId(req);
	if (req.userId) {
		req.user = await userModel.findById(req.userId);
	}
	return;
}

export async function loggedIn(req, res) {
	await decorateWithUserId(req);
	if (req.userId) {
		return;
	}
	return res.status(401).send({ message: 'Must be authenticated' });
}

function filterRoles({ roles, type = 'every' }) {
	return async (req, res) => {
		await decorateWithUser(req);
		const hasRole = (role) => req.user.roles.includes(role);
		if (req.user && roles[type](hasRole)) {
			return;
		}
		return res.status(403).send({ message: 'No permission for this resource' });
	};
}

export const withRoles = (...roles) => filterRoles({ roles });
export const withAnyRoles = (...roles) => filterRoles({ roles, type: 'some' });

function newToken(user) {
	return jwt.sign({ id: user.id }, secret, { expiresIn });
}
