import productModel from '../models/product.js';
import { promises as fs } from 'fs';
import path from 'path';
import { logWarn } from "../../../utils/logger.js";

const filePath = path.resolve('./src/modules/ecom-aws-cloud/migrations/products.json');

const insertProducts = async () => {
    try {
        // Read the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        const products = JSON.parse(data);

        // Check if any product already exists
        const existingProducts = await productModel.find({});
        if (existingProducts.length > 0) {
            logWarn('Products already exist in the database. No new products will be added.');
            return;
        }

        // If no products exist, insert all products
        await productModel.insertMany(products);
        console.log('All products added successfully');
    } catch (err) {
        console.error('Error inserting products', err);
    }
};

export default insertProducts;
