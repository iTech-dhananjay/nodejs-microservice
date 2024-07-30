import mongoose from 'mongoose';
import productModel from '../models/product.js';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.resolve('./src/modules/ecom-aws-cloud/migrations/products.json');

const insertProducts = async () => {
    try {
        // Read the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        const products = JSON.parse(data);

        // Check if any product already exists
        const existingProducts = await productModel.find({});
        console.log(existingProducts, 'existingProducts');
        if (existingProducts.length > 0) {
            console.log('Products already exist in the database. No new products will be added.');
            return;
        }

        // If no products exist, insert all products
        await productModel.insertMany(products);
        console.log('All products added successfully');
    } catch (err) {
        console.error('Error inserting products', err);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
};

// Connect to MongoDB and insert products
const run = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/node-ecom-ms', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is connected');

        await insertProducts();
    } catch (err) {
        console.error('Error running script', err);
    }
};

run();

//node src/modules/ecom-aws-cloud/migrations/importProducts.js
