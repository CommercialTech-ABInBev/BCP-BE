import { Router } from 'express';
import authRoutes from './auth';
import stockRoutes from './stock';
import notificationRoutes from './notification';

const router = Router();

router.use('/', stockRoutes);
router.use('/auth', authRoutes);
router.use('/', notificationRoutes);

export default router;
