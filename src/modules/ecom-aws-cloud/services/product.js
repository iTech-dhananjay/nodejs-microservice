import productModle from '../models/product.js';

const createProduct = async (productData) => {
     try {
          const newProduct = await productModle(productData);
          return await newProduct.save();
     } catch (error) {
          throw new Error(error.message);
     }
};

const getProduct = async () => {
     try {
          const products = await productModle.find();

          return products;
     } catch (error) {
          throw new Error(error.message);
     }
};

// Get products that are going to be out of stock
const getLowStockProducts = async () => {
     try {
          const lowStockThreshold = 16;

          // Find products with available stock less than the threshold
          const lowStockProducts = await productModle.find({
               availableStock: { $lt: lowStockThreshold },
          });

          return lowStockProducts;
     } catch (error) {
          throw new Error(error.message);
     }
};

export const productService = {
     createProduct,
     getProduct,
     getLowStockProducts,
};
