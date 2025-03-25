import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return { db: mongoose.connection }; // Explicitly return the connection
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
    return { db: mongoose.connection }; // Explicitly return the connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}
