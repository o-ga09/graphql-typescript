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
			const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
			req.user = decoded;
		} catch (err) {
			throw new AuthenticationError('Invalid/Expired token', err);
		}
	}

	next();
};
