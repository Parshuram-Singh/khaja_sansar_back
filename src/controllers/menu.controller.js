// controllers/menu.controller.js
import Menu from '../models/menu.model.js';
import { uploadToCloudinary } from '../utils/cloudinaryCloudService.js';

export const createMenu = async (req, res) => {
    try {
        const { name, price, description, category, foodType, isAvailable } = req.body;

        // Basic required field check
        if (!name || !price || !category || !foodType) {
            return res.status(400).json({ message: 'Name, price, category, and foodType are required' });
        }

        let imageUrl = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const menuItem = await Menu.create({
            name,
            price,
            description,
            category,
            foodType,
            isAvailable: isAvailable !== undefined ? isAvailable : true, // Handle undefined case explicitly
            image: imageUrl,
        });

        res.status(201).json({ message: 'Menu item created successfully', menuItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



// Get all menu items
export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json({ menus });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const { menuId } = req.params;

        if (!menuId) {
            return res.status(400).json({ message: 'Menu ID is required' });
        }

        await Menu.findByIdAndDelete(menuId);

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// Update an existing menu item
export const updateMenu = async (req, res) => {
    try {
        const { menuId } = req.params;
        const { name, price, description } = req.body;

        // Check if the menu ID and the required fields are provided
        if (!menuId) {
            return res.status(400).json({ message: 'Menu ID is required' });
        }
        if (!name && !price && !description) {
            return res.status(400).json({ message: 'At least one field (name, price, description) must be provided for update' });
        }

        // Find the menu item and update it
        const updatedMenu = await Menu.findByIdAndUpdate(
            menuId,
            { name, price, description },
            { new: true } // This ensures the updated document is returned
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item updated successfully', menu: updatedMenu });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

