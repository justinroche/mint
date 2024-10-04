import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.json' assert { type: 'json' };

const { MONGODB_URL, HOST, PORT } = config;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
