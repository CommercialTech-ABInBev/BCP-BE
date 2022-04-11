import { Router } from 'express';
import { StockController } from '../controllers/stock';
import { validationMiddleware } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth';
import { upload } from '../middlewares/fileUpload';
import { verifyRoles } from '../middlewares/rolemgt';
import { checkInSchema } from '../validations/stock.validation';

const router = Router();
const stockcontroller = new StockController();

router.get(
  '/adminDashboard',
  authMiddleware,
  verifyRoles(['AM', 'WM']),
  stockcontroller.dashBoard
);

router.post(
  '/check-in',
  authMiddleware,
  upload.single('file'),
  validationMiddleware(checkInSchema),
  verifyRoles(['AM', 'WM', 'am']),
  stockcontroller.stockCheckIn
);

router.patch(
  '/approve-check-in',
  authMiddleware,
  verifyRoles(['AM', 'WM']),
  stockcontroller.approveCheckIn
);

router.get(
  '/get-approved-stocks',
  authMiddleware,
  verifyRoles(['AM', 'BM']),
  stockcontroller.getApprovedStocks
);

router.get(
  '/get-check-ins',
  authMiddleware,
  verifyRoles(['AM', 'BM', 'WM', 'am']),
  stockcontroller.getAllCheckIns
);

router.post(
  '/check-out',
  authMiddleware,
  verifyRoles(['BM', 'WM', 'AM']),
  stockcontroller.checkOut
);

router.get(
  '/get-check-outs',
  authMiddleware,
  verifyRoles(['AM', 'BM', 'WM']),
  stockcontroller.getCheckOut
);

router.patch(
  '/reject-check-out',
  authMiddleware,
  verifyRoles(['AM', 'WM']),
  stockcontroller.rejectCheckOut
);

router.patch(
  '/reject-check-in',
  authMiddleware,
  verifyRoles(['AM', 'WM']),
  stockcontroller.rejectCheckIn
);

router.get(
  '/csvDownloadStocksOrCheckIns',
  authMiddleware,
  verifyRoles(['AM', 'BM', 'WM']),
  stockcontroller.csvDownloadStocks
);

router.get(
  '/csvDownloadCheckOuts',
  authMiddleware,
  verifyRoles(['AM', 'BM', 'WM']),
  stockcontroller.csvDownloadCheckOuts
);

router.patch(
  '/stock-adjustment',
  authMiddleware,
  verifyRoles(['AM']),
  stockcontroller.stockAdjustment
);

router.patch(
  '/approve-reject-adjustment',
  authMiddleware,
  verifyRoles(['AM']),
  stockcontroller.approveStockAdjustment
);

router.patch(
  '/approve-check-out',
  authMiddleware,
  verifyRoles(['AM', 'WM']),
  stockcontroller.approveCheckOut
);

export default router;
