import { Router } from 'express';

import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { StockController } from '../controllers/stock';
import { validationMiddleware } from '../middlewares/validation';

import {
    searchStock,
    addStockSchema,
    stockPriceSchema,
    paginationStockSchema,
    stockSearchParamSchema,
} from '../validations/stock.validation';

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
    verifyRoles(['cic', 'dist']),
    validationMiddleware(stockSearchParamSchema),
    stockcontroller.conditionalFindStock
);

router.get(
    '/getStockPrice',
    authMiddleware,
    verifyRoles(['cic', 'dist', 'whm']),
    validationMiddleware(stockPriceSchema),
    stockcontroller.getStockPrices
);

router.get(
    '/queryStock',
    authMiddleware,
    verifyRoles(['cic', 'whm', 'dist']),
    validationMiddleware(searchStock),
    stockcontroller.searchStocks
);

router.get(
    '/getDepotstocks',
    authMiddleware,
    verifyRoles(['whm', 'dist']),
    validationMiddleware(paginationStockSchema),
    stockcontroller.getWHMstocks
);

router.put(
    '/addStock',
    authMiddleware,
    verifyRoles(['whm', 'dist']),
    stockcontroller.addStock
);

router.get(
    '/downloadStocks',
    authMiddleware,
    verifyRoles(['cic', 'dist']),
    stockcontroller.csvDownloadStock
);

export default router;