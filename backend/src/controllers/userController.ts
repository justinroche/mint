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

  const defaultExpenses = [
    'Bills',
    'Business',
    'Dining',
    'Donations',
    'Education',
    'Entertainment',
    'Family Care',
    'Fees',
    'Groceries',
    'Insurance',
    'Investments',
    'Loan Payments',
    'Medical',
    'Miscellaneous',
    'Personal Care',
    'Pets',
    'Shopping',
    'Taxes',
    'Technology',
    'Transportation',
    'Travel',
  ];

  const defaultIncomes = [
    'Salary',
    'Investments',
    'Gifts',
    'Rental Income',
    'Miscellaneous',
  ];

  defaultExpenses.forEach((name) => {
    user.categories.push({
      name,
      type: 'expense',
      isCustom: false,
    });
  });

  defaultIncomes.forEach((name) => {
    user.categories.push({
      name,
      type: 'income',
      isCustom: false,
    });
  });

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
