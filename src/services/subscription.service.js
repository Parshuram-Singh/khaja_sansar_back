const subscriptionRepository = require('../repositories/subscriptionRepository');

const createSubscription = async (subscriptionData) => {
  return await subscriptionRepository.createSubscription(subscriptionData);
};

const getUserSubscriptions = async (userId) => {
  return await subscriptionRepository.getSubscriptionsByUser(userId);
};

module.exports = { createSubscription, getUserSubscriptions };
