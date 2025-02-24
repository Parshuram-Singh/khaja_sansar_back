// routes/subscriptionRoutes.js
import express from "express";
import { saveSubscription } from "../controllers/subscription.controller.js";

const router = express.Router();

// Save subscription
router.post("/subscribe", saveSubscription);

export default router;
