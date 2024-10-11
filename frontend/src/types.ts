type ID = string;

export type Category = {
  _id?: ID;
  name: string;
  type: 'expense' | 'income';
  icon?: string;
  isCustom: boolean;
};

export type Transaction = {
  _id?: ID;
  amount: number;
  date: string;
  description: string;
  categoryID: ID;
};

export type Budget = {
  _id?: ID;
  categoryID: ID;
  amount: number;
  month: string;
};

export type SavingsGoal = {
  _id?: ID;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: ID;
  displayName: string;
  email: string;
  password: string;
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
};
