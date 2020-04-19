import mongoose from 'mongoose';
import config from '../config/index.js';

export async function connect(opts = {}) {
	const { db } = config;

	return mongoose.connect(db.url, {
		...opts,
		user: db.user,
		pass: db.password,
		family: 4,
		useCreateIndex: true,
		bufferCommands: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
}

export async function disconnect() {
	return mongoose.disconnect();
}
