import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB CONNECTED : ");
  } catch (error) {
    console.error("Error connection to Mongodb: ", error);
    process.exit(1)
  }
};
