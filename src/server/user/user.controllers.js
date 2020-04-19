import { userModel } from './user.model.js';

export async function register(req, res) {
	try {
		const result = await userModel.create(req.body);
		res.send(result);
	} catch (e) {
		if (e.code === 11000) {
			res.status(400).send({ message: 'E-mail already registered' });
			return;
		}
		throw e;
	}
	return res;
}

export async function getCurrentUser(req) {
	return await userModel.findById(req.userId).select({ pwd: 0 }).lean().exec();
}

export async function updateCurrentUser(req) {
	delete user.roles; // user can't update it's own roles
	const user = await userModel.findById(req.userId);
	Object.assign(user, req.body);
	return user.save().lean().exec();
}
