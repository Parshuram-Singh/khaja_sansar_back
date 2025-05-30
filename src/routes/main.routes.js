import express from 'express';
import userRoutes from "./user.routes.js"; 
import menuRoutes from "./menu.routes.js"; 
import subscriptionRoutes from "./subscription.routes.js"
import paymentRoutes from './payment.routes.js'; 
import myProfileRoutes from './myProfile.routes.js'

const router = express.Router();

// Group all route files
router.use('/users', userRoutes);
router.use('/menus', menuRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/payment', paymentRoutes);
router.use('/myProfile', myProfileRoutes);

export default router;
