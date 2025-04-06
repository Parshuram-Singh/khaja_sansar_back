import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String } // Store the name of image
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;