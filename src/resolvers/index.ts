import { IUser, IUserInput, User } from "../controllers/user/user.model";
import { IProduct, IProductInput, Product } from "../models/Product";

export const resolvers = {
  Query: {
    products: async (): Promise<IProduct[]> => await Product.find(),
    product: async (_: any, { id }: { id: string }): Promise<IProduct | null> => await Product.findById(id),
  },
  Mutation: {
    createProduct: async (_: any, request: IProductInput): Promise<IProduct> => {
      const {name, description, price} = request.input || {}
      console.log('input', request.input);
      if(!name || !price) {
        throw new Error('Name and price are required')
      }
      const product = new Product({ name, description, price });
      await product.save();
      return product;
    },
    createUser: async (_: any, request: IUserInput): Promise<IUser> => {
      const { email, password, firstName, lastName, imageUrl, clerkId} = request.input || {}
      console.log('input', request.input);
      if(!email || !password) {
        throw new Error('Email and password are required')
      }
      const user = new User({ 
        email,
        password,
        firstName,
        lastName,
        imageUrl,
        clerkId
      });
      await user.save();
      return user;
    },
  },
};