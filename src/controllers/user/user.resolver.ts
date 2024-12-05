import { IUser, IUserInput, User } from "./user.model";

export const resolvers = {
  Query: {
    users: async (): Promise<IUser[]> => await User.find(),
    user: async (_: any, { id }: { id: string }): Promise<IUser | null> => User.findById(id),
  },
  Mutation: {
    createUser: async (_: any, request: IUserInput): Promise<IUser> => {
      const { email, password, firstName, lastName, imageUrl, clerkId} = request.input || {}
      console.log('input', request.input);
      if(!email || !password || !clerkId) {
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