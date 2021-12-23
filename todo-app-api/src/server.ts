// importing the dependencies
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import initializeDatabase from "./config/database";
import { initRouter } from "./routes";

// defining the Express app
const app = express();

// initialize db connection
initializeDatabase();

// enabling CORS for all requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize routes
app.use("/", initRouter());

const PORT = process.env.PORT || 4000;

// starting the server
try {
  app.listen(PORT, () => {
    console.log(`API is running on port ${PORT}`);
  });
} catch (error) {
  console.log("Failed to start API", error);
}
