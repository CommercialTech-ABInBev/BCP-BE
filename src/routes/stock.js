import { Router } from 'express';

import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { StockController } from '../controllers/stock';
import { validationMiddleware } from '../middlewares/validation';
import { createOrderchema } from '../validations/order.validation';

const router = Router();
const stockcontroller = new StockController();

router.get('/fetchStocks', stockcontroller.getStocks);
router.get('/searchStock', stockcontroller.conditionalFindStock)

export default router;