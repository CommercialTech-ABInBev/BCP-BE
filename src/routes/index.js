import { Router } from 'express';
import authRoutes from './auth';
import stockRoutes from './stock';

const router = Router();

router.use('/', stockRoutes);
router.use('/auth', authRoutes);

export default router;
