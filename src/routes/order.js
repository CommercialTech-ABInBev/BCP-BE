import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth';
import { OrderController } from '../controllers/order';
import { validationMiddleware } from '../middlewares/validation';
import { createOrderchema } from '../validations/order.validation';

const router = Router();
const ordercontroller = new OrderController();

router.post(
    '/createOrder',
    authMiddleware,
    validationMiddleware(createOrderchema),
    ordercontroller.createOrder
);


export default router;