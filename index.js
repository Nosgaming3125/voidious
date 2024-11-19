import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";
import path from "path";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import mime from "mime";
import fetch from "node-fetch";
import { setupMasqr } from "./Masqr.js";  // Adjust path if needed
import config from "./config.js";  // Adjust path if needed

// Manually define __dirname for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const bareServer = createBareServer("/ov/");

const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

// Your '/e/*' route and other routes here
app.get("/e/*", async (req, res, next) => {
  // Your asset-fetching logic here
  try {
    res.send("Example endpoint");
  } catch (error) {
    res.status(500).send("Error fetching asset");
  }
});

// Static files
app.use(express.static(path.join(__dirname, "static")));

// Fallback route for 404 errors
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Export handler function for Vercel
export default (req, res) => {
  app(req, res);
};
