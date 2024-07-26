import { Router } from 'express';
import { warehouseService } from '../services/warehouse.js';
import isLoggedInAndAdmin from '../../../middleware/isLoggedIn.js';

const router = Router();

router.post('/add', isLoggedInAndAdmin, async (req, res) => {
     try {
          const newWarehouse = await warehouseService.createWarehouse(req.body);
          res.status(201).json(newWarehouse);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
});

// Get a list of all warehouses
router.get('/list', async (req, res) => {
     try {
          const warehouses = await warehouseService.getWarehouses();
          res.status(200).json(warehouses);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
});

router.put('/update/:id', isLoggedInAndAdmin, async (req, res) => {
     try {
          const warehouseId = req.params.id;
          const { products } = req.body;

          const updatedWarehouse =
               await warehouseService.updateWarehouseProducts(
                    warehouseId,
                    products
               );

          res.status(200).json(updatedWarehouse);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
});

export default router;
