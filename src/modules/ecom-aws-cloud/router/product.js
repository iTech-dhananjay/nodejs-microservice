import { Router } from 'express';
import { productService } from '../services/product.js';
import isLoggedInAndAdmin from '../../../middleware/checkAdminRole.js';

const router = Router();

router.post('/add', isLoggedInAndAdmin, async (req, res) => {
     try {
          const newProduct = await productService.createProduct(req.body);
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
