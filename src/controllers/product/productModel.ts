import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
}

export interface IProductInput {
  input: {
    name: string;
    description?: string;
    price: number;
  }
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

productSchema.index({ createdAt: -1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);