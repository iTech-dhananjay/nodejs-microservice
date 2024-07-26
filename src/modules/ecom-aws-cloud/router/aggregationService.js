import { Router } from 'express';
import { aggregationService } from '../services/aggregationService.js';
const router = Router();

router.get('/', async (req, res) => {
     try {
          const result = await aggregationService.aggregateData();
          res.json({ success: true, result });
     } catch (error) {
          console.error('Error aggregating data:', error);
          res.status(500).json({
               success: false,
               message: 'An error occurred while aggregating data.',
          });
     }
});

export default router;
