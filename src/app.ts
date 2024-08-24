import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from '@/lib/resolver'; // リゾルバ
import { typeDefs } from '@/lib/resolver'; // GraphQLスキーマ

async function Run() {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer( server, {
        listen: {port: 8080},
    });
    
    console.log(`🚀 Server ready at ${url}`);
}

Run();