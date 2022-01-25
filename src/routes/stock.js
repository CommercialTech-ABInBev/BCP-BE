import { Router } from 'express';
import { StockController } from '../controllers/stock';
import { validationMiddleware } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth';
import { upload } from '../middlewares/fileUpload';
import { verifyRoles } from '../middlewares/rolemgt'
import {
    checkInSchema
} from '../validations/stock.validation';

const router = Router();
const stockcontroller = new StockController();

router.post('/check-in',
    authMiddleware,
    upload.single('file'),
    validationMiddleware(checkInSchema),
    stockcontroller.stockCheckIn)

router.patch('/approve-check-in',
    authMiddleware,
    verifyRoles(['Admin', 'WM']),
    stockcontroller.approveCheckIn);

router.get('/get-approved-stocks',
    authMiddleware,
    verifyRoles(['Admin']),
    stockcontroller.getApprovedStocks)

router.get('/get-check-ins', authMiddleware, verifyRoles(['Admin', 'WM']), stockcontroller.getAllCheckIns)

export default router;