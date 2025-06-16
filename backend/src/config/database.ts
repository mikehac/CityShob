import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tasks";
  console.log("Connecting to MongoDB at:", MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
