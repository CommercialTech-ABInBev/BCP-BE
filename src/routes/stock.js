import { Router } from 'express';

import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { StockController } from '../controllers/stock';

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
    verifyRoles(['cic', 'dist', 'admin']),
    stockcontroller.conditionalFindStock
);

router.get(
    '/getStockPrice',
    authMiddleware,
    verifyRoles(['cic', 'dist', 'admin']),
    stockcontroller.getStockPrices
);

router.get(
    '/queryStock',
    authMiddleware,
    verifyRoles(['cic', 'whm', 'dist', 'admin']),
    stockcontroller.searchStocks
);

router.get(
    '/getDepotstocks',
    authMiddleware,
    verifyRoles(['whm', 'dist', 'admin']),
    stockcontroller.getWHMstocks
);

router.put(
    '/addStock',
    authMiddleware,
    verifyRoles(['whm', 'dist', 'admin']),
    stockcontroller.addStock
);

router.get(
    '/downloadStocks',
    authMiddleware,
    verifyRoles(['cic', 'dist', 'admin']),
    stockcontroller.csvDownloadStock
);

export default router;