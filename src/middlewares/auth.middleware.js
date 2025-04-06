import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Authentication Middleware
export const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ 
        message: "Authentication failed: No authorization header provided",
        error: "NO_AUTH_HEADER"
      });
    }

    // Check if token follows Bearer scheme
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        message: "Authentication failed: Invalid token format",
        error: "INVALID_TOKEN_FORMAT"
      });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ 
        message: "Authentication failed: Token missing",
        error: "NO_TOKEN"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.accessTokenSecret);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        message: "Authentication failed: Token has expired",
        error: "TOKEN_EXPIRED"
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        message: "Authentication failed: Invalid token",
        error: "INVALID_TOKEN"
      });
    }

    // Generic error
    return res.status(401).json({ 
      message: "Authentication failed: Unable to verify token",
      error: "AUTHENTICATION_ERROR",
      details: error.message
    });
  }
};

// Authorization Middleware
export const authorize = (roles = []) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ 
        message: "Authorization failed: User not authenticated",
        error: "NOT_AUTHENTICATED"
      });
    }

    // If no roles specified, allow all authenticated users
    if (!roles.length) {
      return next();
    }

    // Check if user has required role
    if (!req.user.role) {
      return res.status(403).json({ 
        message: "Authorization failed: User role not defined",
        error: "NO_ROLE_DEFINED"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Authorization failed: Insufficient permissions",
        error: "INSUFFICIENT_PERMISSIONS",
        role: req.user.role,
        requiredRoles: roles
      });
    }

    next();
  };
};

// Example usage:
// app.get('/admin', authenticate, authorize(['admin']), adminRoute);
// app.get('/user', authenticate, authorize(['user', 'admin']), userRoute);
// app.get('/public', authenticate, authorize(), publicRoute);