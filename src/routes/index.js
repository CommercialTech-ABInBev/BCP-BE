import { Router } from 'express';

import authRoutes from './auth';
import AddData from './addData';
import orderRoutes from './order';
import stockRoutes from './stock';

const router = Router();

router.use('/', orderRoutes);
router.use('/', stockRoutes);
router.use('/adddata', AddData);
router.use('/auth', authRoutes);

export default router;