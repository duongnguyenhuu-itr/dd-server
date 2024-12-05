import { IProduct, IProductInput, Product } from "./productModel";

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
  },
};