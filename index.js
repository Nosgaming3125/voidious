import { createBareServer } from "@tomphttp/bare-server-node";
import path from "node:path";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import basicAuth from "express-basic-auth";
import mime from "mime";
import fetch from "node-fetch";
import { setupMasqr } from "../Masqr.js";  // Adjust path if necessary
import config from "../config.js";  // Adjust path if necessary

const app = express();

// Middleware Setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bareServer = createBareServer("/ov/");

app.use(cors({ origin: true }));

// Add your routes and logic here
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

export default function handler(req, res) {
  app(req, res);
}
