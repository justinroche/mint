import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.json' assert { type: 'json' };
import { createUser } from './controllers/userController.js';

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

app.get('/test', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.post('/create-user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  createUser(email, password)
    .then((user) => res.json(user))
    .catch((error) => res.status(500).json({ message: error.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
