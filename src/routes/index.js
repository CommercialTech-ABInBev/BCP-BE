import { Router } from 'express';
import AddData from './addData';
import authRoutes from './auth';
import orderRoutes from './order';

const router = Router();

router.use('/adddata', AddData);
router.use('/auth', authRoutes);
router.use('/', orderRoutes);

export default router;
