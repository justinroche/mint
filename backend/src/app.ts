import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.json' assert { type: 'json' };
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from './controllers/userController.js';
import { Transaction } from './models/userModel.js';

const { MONGODB_URL, HOST, PORT } = config;

const app = express();

app.use(cors());
app.use(express.json());

if (!MONGODB_URL) {
  throw new Error('MongoDB URL not found');
}

mongoose
  .connect(MONGODB_URL, { dbName: 'mint' })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.error(error));

// Check if an email is already in use
app.get('/check-email/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: 'No email provided' });
    }

    const user = await getUserByEmail(email);

    return res.json({ exists: !!user });
  } catch (error: any) {
    console.error('Error checking email: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error checking email: ' + error.message });
  }
});

// Create a new user
app.post('/create-user', async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Display name, email, and password are required' });
    }

    const user = await createUser(displayName, email, password);

    return res.json(user);
  } catch (error: any) {
    console.error('Error creating user: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error creating user: ' + error.message });
  }
});

// Log in via email and password
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.json(user);
  } catch (error: any) {
    console.error('Error logging in: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error logging in: ' + error.message });
  }
});

// Get a user by their ID
app.get('/users/:userID', async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({ message: 'No user ID provided' });
    }

    const user = await getUserById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error: any) {
    console.error('Error fetching user: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error fetching user: ' + error.message });
  }
});

// Add a new transaction to the user's transactions array
app.post('/users/:userID/transactions', async (req, res) => {
  try {
    const { userID } = req.params;
    const transaction: Transaction = req.body;

    if (!userID) {
      return res.status(400).json({ message: 'No user ID provided' });
    }

    if (
      !transaction ||
      !transaction.description ||
      !transaction.date ||
      !transaction.categoryID ||
      !transaction.amount
    ) {
      return res.status(400).json({
        message: 'Description, date, category ID, and amount are required',
      });
    }

    // Convert the date string to a UTC Date object
    transaction.date = new Date(transaction.date + 'T00:00:00Z');

    const user = await updateUser(userID, {
      $push: { transactions: transaction },
    });

    return res.json(user.transactions.slice(-1)[0]);
  } catch (error: any) {
    console.error('Error adding transaction: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error adding transaction: ' + error.message });
  }
});

// Update a transaction in the user's transactions array
app.put('/users/:userID/transactions/:transactionID', async (req, res) => {
  try {
    const { userID, transactionID } = req.params;
    const transaction: Transaction = req.body;
    if (!userID || !transactionID) {
      return res
        .status(400)
        .json({ message: 'User ID and transaction ID are required' });
    }
    if (
      !transaction ||
      !transaction.description ||
      !transaction.date ||
      !transaction.categoryID ||
      !transaction.amount
    ) {
      return res.status(400).json({
        message: 'Description, date, category ID, and amount are required',
      });
    }
    // Convert the date string to a UTC Date object
    transaction.date = new Date(transaction.date + 'T00:00:00Z');

    const updatedUser = await updateUser(
      userID,
      {
        $set: {
          'transactions.$[transaction]': transaction,
        },
      },
      {
        arrayFilters: [{ 'transaction._id': transactionID }],
      }
    );

    const updatedTransaction = updatedUser.transactions.find(
      (t) => t._id!.toString() === transactionID
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.json(updatedTransaction);
  } catch (error: any) {
    console.error('Error updating transaction: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error updating transaction: ' + error.message });
  }
});

// Remove a transaction from the user's transactions array
app.delete('/users/:userID/transactions/:transactionID', async (req, res) => {
  try {
    const { userID, transactionID } = req.params;

    if (!userID || !transactionID) {
      return res
        .status(400)
        .json({ message: 'User ID and transaction ID are required' });
    }

    const updatedUser = await updateUser(userID, {
      $pull: { transactions: { _id: transactionID } },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'Transaction removed' });
  } catch (error: any) {
    console.error('Error removing transaction: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error removing transaction: ' + error.message });
  }
});

// Update the user's budgets array
app.put('/users/:userID/budgets', async (req, res) => {
  try {
    const { userID } = req.params;
    const budgets = req.body.budgets;

    if (!userID) {
      return res.status(400).json({ message: 'No user ID provided' });
    }

    if (!budgets || !Array.isArray(budgets)) {
      return res.status(400).json({ message: 'Budgets must be an array' });
    }

    const user = await updateUser(userID, { budgets });

    return res.json(user.budgets);
  } catch (error: any) {
    console.error('Error updating budgets: ' + error.message);
    return res
      .status(500)
      .json({ message: 'Error updating budgets: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
