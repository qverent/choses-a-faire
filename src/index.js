require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const { errorHandler } = require('./utils/errorHandler')
const { formatError } = require('apollo-errors');

const prisma = new PrismaClient( { errorFormat: 'minimal'});

const Query = require('./graphql/resolvers/Query')
const Mutation = require('./graphql/resolvers/Mutation')
const User = require('./graphql/resolvers/User')
const Item = require('./graphql/resolvers/Item');

const resolvers = {
  Query,
  Mutation,
  Item,
  User
}

const PORT = process.env.PORT || 4000

const serverOptions = {
    port: PORT,
    endpoint: '/graphql',
    formatError, // Doesn't seem to work for non Apollo Errors
    playground: '/playground'
}

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    middlewares: [ errorHandler ],
    context: request => {
      return {
      ...request,
      prisma,
    }
  }
  })

server.start(serverOptions, () => console.log(`Server is running on http://localhost:${PORT}`))    


