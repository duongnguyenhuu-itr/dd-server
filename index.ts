import { Product } from './src/models/Product';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './src/schema';
import { resolvers } from './src/resolvers';

const PORT = process.env.PORT || 4000;
const USER_NAME_DB = 'secret211199'
const PASSWORD_DB = 'VbEpDLSbWIsAztpA'
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://${USER_NAME_DB}:${PASSWORD_DB}@double-d-db.6m96m.mongodb.net/`;

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB', Product);

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer().catch((error) => {
  console.error('Unhandled error during server startup:', error);
  process.exit(1);
});