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

export const getUserById = async (userID: string): Promise<User> => {
  const user = await UserModel.findById(userID).exec();
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

export const updateUser = async (
  userID: string,
  update: object,
  options?: {
    arrayFilters?: any[];
  }
): Promise<User> => {
  const updatedUser = await UserModel.findByIdAndUpdate(userID, update, {
    new: true,
    runValidators: true,
    arrayFilters: options?.arrayFilters,
  });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};
