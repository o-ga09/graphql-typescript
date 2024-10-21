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
	const bearertoken = req.headers.authorization;
	if (bearertoken) {
		try {
			const token = bearertoken.split(' ')[1] || '';
			jwt.verify(token, process.env.AUTH_KEY, (err, user) => {
				req.user = user.id;
			});
		} catch (err) {
			throw new AuthenticationError('Invalid/Expired token', err);
		}
	}
	next();
};
