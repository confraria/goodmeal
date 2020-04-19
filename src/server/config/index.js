import dotenv from 'dotenv';

dotenv.config();

const { env } = process;
const config = {
	isProduction: env.NODE_ENV === 'production',
	db: {
		url: env.DB_URL,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
	},
	jwt: {
		secret: 'sLhvBLGtiYpnfdZuuWeq8feP9YzYCow7mWcRWJZUTB8srLzhSN4YNFPRzEWNzK5zKkGzv',
		expiresIn: 3600 * 12,
	},
	port: parseInt(env.PORT),
	logger: true,
};

if (env.NODE_ENV === 'test') {
	config.logger = false;
	config.db.url = 'mongodb://localhost:27017/goodmeal-test';
}
export default config;
