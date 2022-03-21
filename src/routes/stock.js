import { Router } from 'express';

import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { StockController } from '../controllers/stock';
// import { validationMiddleware } from '../middlewares/validation';
// import { createOrderchema } from '../validations/order.validation';

const router = Router();
const stockcontroller = new StockController();

router.get(
  '/fetchStocks',
  authMiddleware,
  verifyRoles(['cic']),
  stockcontroller.getStocks
);
router.get(
  '/searchStock',
  authMiddleware,
  verifyRoles(['cic']),
  stockcontroller.conditionalFindStock
);

router.get(
  '/getStockPrice',
  authMiddleware,
  verifyRoles(['cic']),
  stockcontroller.getStockPrices
);

router.get(
  '/queryStock',
  authMiddleware,
  verifyRoles(['cic', 'whm', 'admin']),
  stockcontroller.searchStocks
);

router.get(
  '/getWHMstocks',
  authMiddleware,
  verifyRoles(['whm']),
  stockcontroller.getWHMstocks
);

router.put('/addStock', stockcontroller.addStock);

export default router;
