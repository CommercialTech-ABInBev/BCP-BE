import { Router } from 'express';

import authRoutes from './auth';
import orderRoutes from './order';

const router = Router();

router.use('/auth', authRoutes);
router.use('/', orderRoutes);

export default router;
