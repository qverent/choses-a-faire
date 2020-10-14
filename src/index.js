require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient({
    log: [
        { emit: 'event', level: 'warn'},
        { emit: 'event', level: 'info'}
    ]
});

prisma.$on('warn', event => {
    e.timestamp;
    e.message;
    e.target;
    console.log('[DB WARN]', e);
  });

prisma.$on('info', event => {
  e.timestamp;
  e.message;
  e.target;
  console.log('[DB INFO]', e);
});

const Query = require('./graphql/resolvers/Query')
const Mutation = require('./graphql/resolvers/Mutation')
const User = require('./graphql/resolvers/User')
const Item = require('./graphql/resolvers/Item')

const resolvers = {
  Query,
  Mutation,
  Item,
  User
}

const options = {
    port: PORT,
    endpoint: '/graphql',
    playground: '/playground'
}

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    context: request => {
      return {
      ...request,
      prisma,
    }
  }
  })
  server.start(options, () => console.log(`Server is running on http://localhost:${PORT}`))    


