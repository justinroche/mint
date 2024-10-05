import { UserModel, User } from '../models/userModel.js';

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  if (await getUserByEmail(email)) {
    throw new Error(`Email ${email} already exists`);
  }

  const user = new UserModel({ email, password });
  await user.save();

  if (!user) {
    throw new Error('Error creating user');
  }

  return user;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  return UserModel.findById(userId).exec();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};
