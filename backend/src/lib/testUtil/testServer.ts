import { ApolloServer } from '@apollo/server';
import { resolvers } from '../../lib/resolver'; // リゾルバ
import { typeDefs } from '../../lib/resolver'; // GraphQLスキーマ
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createTestdbConnection, dbconnection } from '../../db';
import { NoteDao } from '../dao/note';
import cors from 'cors';

export interface TestServerParam {
	dbuser: string;
	dbpassword: string;
	dbhost: string;
	dbport: string;
	dbname: string;
}

export const createTestServer = async (param: TestServerParam) => {
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	app.use(
		'/graphql',
		cors<cors.CorsRequest>(),
		express.json(),
		expressMiddleware(server, {
			context: async () => {
				await createTestdbConnection(param);
				const noteDao = new NoteDao(dbconnection);
				return { noteDao };
			},
		})
	);

	return httpServer;
};
