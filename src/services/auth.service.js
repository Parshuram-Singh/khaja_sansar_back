import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/config.js";

// Generate Access Token
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.accessTokenSecret,
    { expiresIn: config.accessTokenExpiry }
  );
};

// Generate Refresh Token
export const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ id: user._id }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiry,
  });

  // Hash and save token
  user.refreshToken = await bcrypt.hash(refreshToken, 10);
  await user.save();
  return refreshToken;
};

// Verify Token
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
