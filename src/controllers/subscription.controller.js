const subscriptionService = require('../services/subscription.service');

const createSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.createSubscription({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

const getUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await subscriptionService.getUserSubscriptions(req.user.id);
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSubscription, getUserSubscriptions };
