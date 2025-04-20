import dotenv from "dotenv";

dotenv.config(); // Load environment variables
import {DB_NAME} from "../constants.js"



export const config = {
  dbURI:"mongodb+srv://KhajaSansar:Khaja12345@khajacluster.2xmyc.mongodb.net",
  dbName: DB_NAME,  // If you have a DB_NAME variable in the .env file
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  corsOrigin: process.env.CORS_ORIGIN,
  port: process.env.PORT || 3000,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
};
