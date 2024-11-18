import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    role: UserRole!
    createdAt: DateTime!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    stockQuantity: Int!
    category: Category
    images: [String!]
    specifications: [Specification!]
    createdAt: DateTime!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    parentCategory: Category
    products: [Product!]
  }

  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]!
    totalAmount: Float!
    status: OrderStatus!
    shippingAddress: Address!
    createdAt: DateTime!
  }

  type OrderItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Specification {
    key: String!
    value: String!
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }

  enum UserRole {
    USER
    ADMIN
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  scalar DateTime

  type Query {
    getUser(id: ID!): User
    getProducts(category: ID, search: String): [Product!]!
    getProduct(id: ID!): Product
    getCategories: [Category!]!
    getOrders(userId: ID!): [Order!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
    createOrder(input: OrderInput!): Order!
    updateOrderStatus(id: ID!, status: OrderStatus!): Order!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  input ProductInput {
    name: String!
    description: String
    price: Float!
    stockQuantity: Int!
    category: ID
    images: [String!]
    specifications: [SpecificationInput!]
  }

  input SpecificationInput {
    key: String!
    value: String!
  }

  input OrderInput {
    items: [OrderItemInput!]!
    shippingAddress: AddressInput!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }
`;

module.exports = typeDefs;