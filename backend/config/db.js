import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI || mongoURI.includes('<username>') || mongoURI.includes('<password>')) {
      console.error("❌ Invalid MongoDB URI. Please update your .env file with a valid MongoDB connection string.");
      console.error("For local MongoDB: MONGO_URI=mongodb://localhost:27017/studentdb");
      console.error("For MongoDB Atlas: Get your connection string from https://www.mongodb.com/cloud/atlas");
      process.exit(1);
    }

    // Connect with database name specified
    await mongoose.connect(mongoURI, {
      dbName: 'CRUD'
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("\nPlease ensure:");
    console.error("1. MongoDB is running (for local connections)");
    console.error("2. Your MONGO_URI in .env file is correct");
    console.error("3. Network/firewall allows MongoDB connections");
    process.exit(1);
  }
};

export default connectDB;
