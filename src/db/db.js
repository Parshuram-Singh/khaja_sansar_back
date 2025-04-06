// /src/db/db.js

import mongoose from 'mongoose';
import { config } from '../config/config.js';

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(`${config.dbURI}/${config.dbName}`)
    console.log(`MongoDB connected at ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
