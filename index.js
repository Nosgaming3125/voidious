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

// Example routes (Ensure these paths match what you're trying to access)
app.get("/e/*", async (req, res) => {
  // Your logic for handling /e/* route
  res.send("Handling /e/* route");
});

app.get("/as", (req, res) => {
  res.send("Apps page");
});

app.get("/gm", (req, res) => {
  res.send("Games page");
});

// Ensure fallback route is defined
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Export default handler for Vercel serverless function
export default app;
