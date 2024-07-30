import { Router } from 'express';
import { productService } from '../services/product.js';
import isLoggedInAndAdmin from '../../../middleware/checkAdminRole.js';

const router = Router();

router.post('/add', isLoggedInAndAdmin, async (req, res) => {
     try {
          const { name, price, availableStock } = req.body;

          if (!name || typeof price !== 'number' || typeof availableStock !== 'number') {
               return res.status(400).json({ error: 'Invalid input' });
          }

          const productData = {
               name,
               price,
               availableStock,
          };

          const newProduct = await productService.createProduct(productData);
          res.status(201).json(newProduct);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
});

router.get('/list', async (req, res) => {
     try {
          const products = await productService.getProduct();

           res.status(200).json({
                message: 'Retrieved products',
                 products,
           });
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
});

router.get('/:id', isLoggedInAndAdmin, async (req, res) => {
     try {
          const { id } = req.params;
          const product = await productService.getProductById(id);

          if (!product) {
               return res.status(404).json({
                    message: 'Product not found',
               });
          }

          return res.status(200).json({
               message: 'Product retrieved successfully',
               product,
          });
     } catch (error) {
          console.error('Error retrieving product:', error.message);
          res.status(500).json({
               message: 'An error occurred while retrieving the product',
          });
     }
});

// Get products that are going to be out of stock
router.get('/out-of-stock', isLoggedInAndAdmin, async (req, res) => {
     try {
          const lowStockProducts = await productService.getLowStockProducts();

          res.status(200).json(lowStockProducts);
     } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
     }
});

export default router;
