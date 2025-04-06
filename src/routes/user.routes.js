import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById } from '../controllers/user.controller.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);


export default router;
