import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }

  input CreateProductInput {
    name: String!, 
    description: String, 
    price: Float!
  }

  input CreateUserInput {
    email: String!, 
    firstName: String,
    lastName: String,
    imageUrl: String,
    clerkId: String
  }

  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    imageUrl: String
    clerkId: String
  }

  type Query {
    product(id: ID!): Product,
    products: [Product!]!
  }

  type Mutation {
    createProduct( input: CreateProductInput ): Product,
    createUser( input: CreateUserInput ): User
  }
`;