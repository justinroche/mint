import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.json' assert { type: 'json' };
import {
  createUser,
  getUserByEmail,
  getUserById,
} from './controllers/userController.js';

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
  .catch((error) => console.log(error));

app.post('/create-user', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await createUser(email, password);

    return res.json(user);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error creating user: ' + error.message });
  }
});

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
    return res
      .status(500)
      .json({ message: 'Error logging in: ' + error.message });
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error fetching user: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
