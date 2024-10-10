import { UserModel, User } from '../models/userModel.js';

export const createUser = async (
  displayName: string,
  email: string,
  password: string
): Promise<User> => {
  if (await getUserByEmail(email)) {
    throw new Error(`Email ${email} already exists`);
  }

  const user = new UserModel({ displayName, email, password });

  user.categories.push({ name: 'Food', type: 'expense', isCustom: false });
  user.categories.push({ name: 'Salary', type: 'income', isCustom: false });

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
