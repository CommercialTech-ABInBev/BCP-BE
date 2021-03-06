import { Router } from 'express';

import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { ReconcileController } from '../controllers/reconcillation';

const router = Router();
const reconcileController = new ReconcileController();

router.post(
    '/postReconcile',
    authMiddleware,
    verifyRoles(['whm', 'dist',]),
    reconcileController.createReconcile
);

router.get(
  '/getReconcillation',
  authMiddleware,
  verifyRoles(['whm', 'dist', 'cic', 'superadmin']),
  reconcileController.getWHMreconcillationn
);

router.get(
  '/downloadReconcillation',
  authMiddleware,
  verifyRoles(['dist', 'cic', 'whm', 'superadmin']),
  reconcileController.csvDownloadReconcillation
);

export default router;