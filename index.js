import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import basicAuth from "express-basic-auth";
import mime from "mime";
import fetch from "node-fetch";
import { setupMasqr } from "./Masqr.js";  // Adjust path if necessary
import config from "./config.js";  // Adjust path if necessary

const app = express();

// Middleware Setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// Routes and logic for the app
app.get("/e/*", async (req, res, next) => {
  try {
    // Your logic for handling the `/e/*` route
  } catch (error) {
    res.status(500).send("Error fetching asset");
  }
});

if (config.challenge) {
  app.use(basicAuth({ users: config.users, challenge: true }));
}

if (process.env.MASQR === "true") {
  setupMasqr(app);
}

// Fallback route
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Export default handler for Vercel serverless function
export default app;
