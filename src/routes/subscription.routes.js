// routes/subscriptionRoutes.js
import express from "express";
import { saveSubscription, getAllSubscription } from "../controllers/subscription.controller.js";

const router = express.Router();

// Save subscription
router.post("/subscribe", saveSubscription);
router.get("/all", getAllSubscription);

export default router;
