import { Router } from 'express';
import { StockController } from '../controllers/stock';
import { validationMiddleware } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth'
import { upload } from '../middlewares/fileUpload'
import {
    checkInSchema
} from '../validations/stock.validation';

const router = Router();
const stockcontroller = new StockController();

router.post('/check-in', upload.single('file'), validationMiddleware(checkInSchema), stockcontroller.stockCheckIn)

export default router;