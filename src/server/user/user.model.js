import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const roles = ['reviewer', 'owner', 'admin'];

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		pwd: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		roles: [{ type: String, enum: roles }],
	},
	{
		timestamps: true,
	},
);

function updateEncryptedPassword(next) {
	if (!this.isModified('pwd')) {
		next();
	}

	bcrypt.hash(this.pwd, 8, (err, encryptedPassword) => {
		this.pwd = encryptedPassword;
		next(err);
	});
}
userSchema.pre('save', updateEncryptedPassword);

userSchema.method('checkPassword', async function checkPassword(maybePassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(maybePassword, this.pwd, (err, matches) => {
			if (err) reject(err);
			resolve(matches);
		});
	});
});

export const userModel = mongoose.model('user', userSchema);
