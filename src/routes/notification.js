import { Router } from 'express';
import { NotificationController } from '../controllers/notification';
import { validationMiddleware } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/auth';
import { verifyRoles } from '../middlewares/rolemgt';

const router = Router();
const notificationcontroller = new NotificationController();

router.get('/admin-get-notifications', authMiddleware, verifyRoles(['AM']), notificationcontroller.getAllNotifications);

router.get('/get-user-notifications', authMiddleware, verifyRoles(['AM', 'BM', 'WM']), notificationcontroller.getAuthUserNotifications);

router.get('/get-stock-notification', authMiddleware, verifyRoles(['AM', 'BM', 'WM']), notificationcontroller.getStockUserNotifications);

export default router;