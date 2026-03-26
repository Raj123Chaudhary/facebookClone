import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connect successfully");
    //     console.log(`Host: ${conn.connection.host}`);
  } catch (error) {
    console.log("db not connected :", error.message);
    process.exit(1);
  }
};
export default dbConnect;
