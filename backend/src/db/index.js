import mongoose from "mongoose"; // Importing mongoose
// Importing the DB_NAME from the constants.js file
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    // console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    // console.log(`ConnectionInstance: ${connectionInstance}`);
  } catch (err) {
    console.log("Connection Error: ", err);
    process.exit(1);
  }
};

export default connectDB;
