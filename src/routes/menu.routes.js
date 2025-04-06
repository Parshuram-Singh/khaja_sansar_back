// routes/menu.routes.js
import express from 'express';
import { createMenu, getMenus, deleteMenu, updateMenu } from '../controllers/menu.controller.js';
import { uploadMenuImage } from '../middlewares/multer.js';

const router = express.Router();

router.post('/create', uploadMenuImage.single('image'), createMenu);
router.get('/all', getMenus);
router.delete('/:menuId', deleteMenu);
router.put('/:menuId', updateMenu);

export default router;