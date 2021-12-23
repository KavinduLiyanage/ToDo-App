import mongoose from "mongoose";

const DB_CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.oyrnv.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const initializeDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(0);
  }
};

export default initializeDatabase;
