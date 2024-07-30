import productModel from '../models/product.js';

const createProduct = async (productData) => {
     try {
          const newProduct = await productModel(productData);
          return await newProduct.save();
     } catch (error) {
          throw new Error(error.message);
     }
};

const getProduct = async () => {
     try {
          const products = await productModel.find();

          return products;
     } catch (error) {
          throw new Error(error.message);
     }
};

const getProductById = async (id) => {
     try {
          const product = await productModel.findById(id);
          if (!product) {
               throw new Error('Product not found');
          }
          return product;
     } catch (error) {
          throw new Error('Error retrieving product: ' + error.message);
     }
};

// Get products that are going to be out of stock
const getLowStockProducts = async () => {
     try {
          const lowStockThreshold = 16;

          // Find products with available stock less than the threshold
          const lowStockProducts = await productModel.find({
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
     getProductById,
     getLowStockProducts,
};
