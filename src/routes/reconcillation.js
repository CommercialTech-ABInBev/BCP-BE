import { Router } from 'express';

import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { ReconcileController } from '../controllers/reconcillation';

const router = Router();
const reconcileController = new ReconcileController();

router.post(
  '/postReconcile',
  authMiddleware,
  verifyRoles(['whm']),
  reconcileController.createReconcile
);

router.get(
  '/getReconcillation',
  authMiddleware,
  verifyRoles(['whm']),
  reconcileController.getWHMreconcillationn
);

export default router;
