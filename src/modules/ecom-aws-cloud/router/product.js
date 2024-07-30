import { Router } from 'express';
import { productService } from '../services/product.js';
import isLoggedInAndAdmin from '../../../middleware/checkAdminRole.js';
import { generateQRCode } from '../../../utils/qrCodeGenerator.js'

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

// Route to get product details along with QR code
router.get('/:id', async (req, res) => {
     try {
          const productId = req.params.id;
           const product = await productService.getProductById(productId);

          if (!product) {
               return res.status(404).json({ message: 'Product not found' });
          }

          const qrCodeFilename = `${productId}.png`;
          await generateQRCode(JSON.stringify(product.name), qrCodeFilename);

          res.json({ product, qrCode: `/qrcodes/${qrCodeFilename}` });
     } catch (err) {
          console.error('Error fetching product details:', err);
          res.status(500).json({ message: 'Internal server error' });
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
