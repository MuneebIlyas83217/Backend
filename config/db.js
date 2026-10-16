import mongoose from "mongoose";

// Serverless-friendly: cache the connect promise so concurrent requests share one
// attempt, and clear it on failure so the NEXT request retries automatically.
let connectionPromise = null;

const connectDb = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        connectionPromise = null; // allow retry on next request
        console.log("Error connecting to database:", error.message);
        throw error;
      });
  }
  return connectionPromise;
};

export default connectDb;
