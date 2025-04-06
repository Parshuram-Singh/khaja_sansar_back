import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../services/auth.service.js";
import jwt from 'jsonwebtoken';  // Add this import at the top of the file


export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    
    await user.save(); // Save user to database first

    console.log(user); // Logging the user object after saving

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return res.status(201).json({
      message: "User registered successfully",
      user,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    return res.status(400).json({ message: "Error creating user", error: error.message });
  }
};



// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt with email:", email);
    console.log("Login attempt with password:", password)
    const user = await User.findOne({ email });
    console.log("User found:", user.password);
    const {password: _, ...safeUserData} = user.toObject();

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //the User model's isPasswordCorrect method call
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
    console.log("Login successful");
    console.log();
    
    res.json({message: "Login successful", token, user: safeUserData });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Find all users in the database
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id) // Changed from userId to id to match route
      .select('-password -refreshToken');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};