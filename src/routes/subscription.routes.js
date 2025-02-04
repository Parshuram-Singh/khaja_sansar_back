const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure user is logged in

router.post('/', authMiddleware, subscriptionController.createSubscription);
router.get('/', authMiddleware, subscriptionController.getUserSubscriptions);

module.exports = router;
