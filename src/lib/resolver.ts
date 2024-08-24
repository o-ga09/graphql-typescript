import { Resolvers } from '@/generated/graphql';
import fs from 'fs';

export const typeDefs = fs.readFileSync('./schema.graphql', {
	encoding: 'utf8',
});

export const resolvers: Resolvers = {
	Query: {
		authors: async (_parent, _args, { prisma }) => {
			return await prisma.author.findMany();
		},
		authorById: async (_parent, { id }, { prisma }) => {
			return await prisma.author.findUnique({
				where: { id: id },
			});
		},
	},
};
