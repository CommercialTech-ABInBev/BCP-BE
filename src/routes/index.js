import { Router } from 'express';
import AddData from './addData';
import authRoutes from './auth';

const router = Router();

router.use('/adddata', AddData);
router.use('/auth', authRoutes);

export default router;
