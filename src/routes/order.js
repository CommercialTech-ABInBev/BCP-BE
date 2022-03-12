import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth';
import { OrderController } from '../controllers/order';
import { validationMiddleware } from '../middlewares/validation';
import { loginSchema, resetPassword } from '../validations/auth.validation';

const router = Router();
const ordercontroller = new OrderController();

router.post('/createOrder', authMiddleware, ordercontroller.createOrder)
export default router;