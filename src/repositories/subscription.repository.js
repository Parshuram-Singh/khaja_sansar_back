const Subscription = require('../models/subscription.model');

const createSubscription = async (data) => {
  return await Subscription.create(data);
};

const getSubscriptionsByUser = async (userId) => {
  return await Subscription.find({ user: userId });
};

module.exports = { createSubscription, getSubscriptionsByUser };
