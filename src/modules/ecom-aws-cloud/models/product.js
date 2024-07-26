import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
     name: String,
     price: Number,
     availableStock: Number, // Represents the available stock quantity of the product
});

const productModle = mongoose.model('products', productSchema);

export default productModle;
