import { ApolloServer } from '@apollo/server';
import { resolvers } from '@/lib/resolver'; // リゾルバ
import { typeDefs } from '@/lib/resolver'; // GraphQLスキーマ
import express from 'express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { NoteDao } from '@/lib/dao/note';
import { closeConnection, createConnection, dbconnection } from '@/db';
import { logger } from '@/lib/middleware/logger';
import dotenv from 'dotenv';
dotenv.config(); // dotenvパッケージを使用して環境変数を読み込む

const port = process.env.PORT || 8080;

const app = express();
const httpServer = http.createServer(app);

const AplloServer = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await AplloServer.start();

app.use(
	'/graphql',
	cors<cors.CorsRequest>(),
	express.json(),
	expressMiddleware(AplloServer, {
		context: async () => {
			const dbConnection = await createConnection();
			const noteDao = new NoteDao(dbConnection);
			return { noteDao };
		},
	})
);

const server = app.listen(port, () => {
	logger.info(`starting server :${port}`);
});

process.on('SIGTERM', () => {
	// サーバをシャットダウンする
	server.close(() => {
		// シャットダウン時の処理を実装する
		closeConnection(dbconnection);
		logger.info('SIGTERM signal received.');
	});
});
