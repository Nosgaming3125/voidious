import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import mime from 'mime';
import fetch from 'node-fetch';
import { setupMasqr } from './Masqr.js'; // Adjust path if necessary
import config from './config.js'; // Adjust path if necessary

const app = express();

// Middleware Setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get('/as', (req, res) => {
  res.send('Apps page');
});

app.get('/gm', (req, res) => {
  res.send('Games page');
});

// Your custom routes (e.g., /e/* route for dynamic content)
app.get('/e/*', async (req, res, next) => {
  try {
    // Fetch data or handle the route as needed
    res.send('Handling /e/* route');
  } catch (error) {
    next(error);
  }
});

// 404 handler for all unknown routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Export default handler for Vercel serverless function
export default app;
