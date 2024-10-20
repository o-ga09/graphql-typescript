import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
	interface Request {
		user?: unknown;
	}
}
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization || '';
	if (token) {
		try {
			jwt.verify(token, 'your_secret_key', (err, user) => {
				req.user = user.id;
			});
		} catch (err) {
			throw new AuthenticationError('Invalid/Expired token', err);
		}
	}

	next();
};
