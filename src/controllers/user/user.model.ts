import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  clerkId: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInput {
  input: {
    email: string;
    password: string;
    clerkId: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  }
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  clerkId: { type: String, required: true },
  firstName: String,
  lastName: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

userSchema.index({ createdAt: -1 });

export const User = mongoose.model<IUser>('User', userSchema);