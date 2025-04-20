import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { 
        type: String, 
        enum: ['LUNCH', 'DINNER', 'BREAKFAST'],
        default: 'LUNCH',
        required: true 
    },
    isAvailable: { type: Boolean, default: true },
    foodType: { 
        type: String, 
        default: 'non-veg',
        enum: ['veg', 'non-veg'], 
        required: true 
    },
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;