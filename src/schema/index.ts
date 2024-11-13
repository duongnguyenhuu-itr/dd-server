import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }

  type Query {
    product(id: ID!): Product,
    products: [Product!]!
  }

  input CreateProductInput {
    name: String!, 
    description: String, 
    price: Float!
  }

  type Mutation {
    createProduct( input: CreateProductInput ): Product
  }
`;