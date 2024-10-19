import { Request, Response, NextFunction } from 'express';
import { logger } from './logger'; // ロガーをインポート

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const start = process.hrtime();

	res.on('finish', () => {
		const [seconds, nanoseconds] = process.hrtime(start);
		const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2); // ミリ秒に変換
		logger.info(`Request to ${req.path} took ${duration} ms and returned`);
	});

	next();
};
