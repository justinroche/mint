import mongoose, { Schema, ObjectId } from 'mongoose';

export type Category = {
  _id: ObjectId;
  name: string;
  type: 'expense' | 'income';
  icon?: string;
  isCustom: boolean;
};

export type Transaction = {
  _id: ObjectId;
  amount: number;
  date: Date;
  description: string;
  categoryId: ObjectId;
};

export type Budget = {
  _id: ObjectId;
  categoryId: ObjectId;
  amount: number;
  month: Date;
};

export type SavingsGoal = {
  _id: ObjectId;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
};

export interface User extends mongoose.Document {
  _id: ObjectId;
  displayName: string;
  email: string;
  password: string;
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['expense', 'income'], required: true },
  icon: { type: String },
  isCustom: { type: Boolean, required: true },
});

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

const BudgetSchema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  amount: { type: Number, required: true },
  month: { type: Date, required: true },
});

const SavingsGoalSchema = new Schema({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  categories: [CategorySchema],
  transactions: [TransactionSchema],
  budgets: [BudgetSchema],
  savingsGoals: [SavingsGoalSchema],
});

export const UserModel = mongoose.model<User>('User', UserSchema);
