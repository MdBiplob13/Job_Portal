import mongoose from "mongoose";
import colors from "colors";

// Connect to MongoDB

const connectMongoDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error(`Failed to connect to MongoDB`.bgRed.bold);
  }
};

export default connectMongoDb;
