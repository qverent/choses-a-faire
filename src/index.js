require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const { errorHandler } = require('./utils/errorHandler')

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

const PORT = process.env.PORT || 4000

const serverOptions = {
    port: PORT,
    endpoint: '/graphql',
    playground: '/playground'
}

// const errorHandler = async (resolve, root, args, context, info) => {
//     const resolution = await resolve(root, args, context, info);
//     return resolution;
// }

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


