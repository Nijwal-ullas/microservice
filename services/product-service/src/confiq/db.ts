
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(uri);
  console.log("Product Service: MongoDB connected");
};

export default connectDB;
