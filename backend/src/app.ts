import { ApolloServer } from '@apollo/server';
import { resolvers } from '@/lib/resolver'; // リゾルバ
import { typeDefs } from '@/lib/resolver'; // GraphQLスキーマ
import express from 'express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { closeConnection, createConnection, dbconnection, getConnection } from '@/db';
import { logger } from '@/lib/middleware/logger';
import dotenv from 'dotenv';
import { authMiddleware } from './lib/middleware/auth';
import { requestLoggerMiddleware } from './lib/middleware/requestlogger';
dotenv.config(); // dotenvパッケージを使用して環境変数を読み込む

const port = process.env.PORT || 8080;

const app = express();
const httpServer = http.createServer(app);
await createConnection();

const AplloServer = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await AplloServer.start();
app.use(authMiddleware);
app.use(requestLoggerMiddleware);
app.use(
	'/graphql',
	cors<cors.CorsRequest>(),
	express.json(),
	expressMiddleware(AplloServer, {
		context: async ({ req }) => {
			const user = req.user || '';
			await getConnection();
			return { user, dbconnection };
		},
	})
);

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

app.get('/health_check', (req, res) => {
	res.status(200).json({ message: 'healthy' });
});

app.get('/health_check/db', async (req, res) => {
	try {
		await getConnection();
		dbconnection.query('SELECT 1');
		logger.info('db healthy!');
		res.status(200).json({ message: 'healthy' });
	} catch (e) {
		logger.error(e);
		res.status(500).json({ message: 'db unhealthy' });
		return;
	}
});

const server = app.listen(port, () => {
	logger.info(`starting server :${port}`);
});

process.on('SIGTERM', () => {
	// サーバをシャットダウンする
	server.close(() => {
		// シャットダウン時の処理を実装する
		closeConnection();
		logger.info('SIGTERM signal received.');
	});
});
