import { Router } from 'express';
import { createPayment, executePayment } from '../services/payPal.js'; // Adjust the import as needed

const router = Router();

router.post('/create-payment', createPayment);
router.post('/execute-payment', executePayment);

export default router;