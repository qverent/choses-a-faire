require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


// GraphQL Server setup
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
    port: process.env.PORT || 4000,
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


