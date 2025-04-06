import dotenv from 'dotenv';
import {DB_NAME} from "../constants.js"

dotenv.config(); // Load environment variables

export const config = {
  dbURI: process.env.MONGODB_URI,
  dbName: DB_NAME,  // If you have a DB_NAME variable in the .env file
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  corsOrigin: process.env.CORS_ORIGIN,
  port: process.env.PORT || 3000,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
};
