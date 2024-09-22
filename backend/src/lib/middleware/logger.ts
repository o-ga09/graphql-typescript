import winston from 'winston';

const myCustomFormat = winston.format.printf((info) => {
	// カスタムフォーマットに合わせて新しいオブジェクトを構築
	const formattedLogEntry = {
		time: new Date().toISOString(),
		severity: info.level.charAt(0).toUpperCase() + info.level.slice(1), // 先頭を大文字に変換
		'logging.googleapis.com/sourceLocation': info.sourceLocation,
		'logging.googleapis.com/labels': info.Label,
		message: info.message,
		Request: info.req,
	};

	// 新しいオブジェクトを JSON 文字列に変換して返す
	return JSON.stringify(formattedLogEntry);
});
export const logger = winston.createLogger({
	format: winston.format.combine(myCustomFormat),
	level: 'info',
	transports: [new winston.transports.Console()],
});
