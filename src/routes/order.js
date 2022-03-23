import { Router } from 'express';

import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { OrderController } from '../controllers/order';
import { validationMiddleware } from '../middlewares/validation';
import { createOrderchema } from '../validations/order.validation';

const router = Router();
const ordercontroller = new OrderController();

router.post(
  '/createOrder',
  authMiddleware,
  verifyRoles(['cic']),
  validationMiddleware(createOrderchema),
  ordercontroller.createOrder
);

router.get(
  '/getOrders',
  authMiddleware,
  verifyRoles(['cic']),
  ordercontroller.getOrders
);

router.get(
  '/getWHOrders',
  authMiddleware,
  verifyRoles(['whm']),
  ordercontroller.getWHMOrders
);

router.get(
  '/getSpecificOrder',
  authMiddleware,
  verifyRoles(['cic']),
  ordercontroller.queryOrderByCondition
);

router.get(
  '/downloadOrders',
  authMiddleware,
  verifyRoles(['cic']),
  ordercontroller.csvDownloadOrders
);

router.put(
  '/pickOrder',
  authMiddleware,
  verifyRoles(['whm']),
  ordercontroller.pickOrder
);
router.post(
  '/loadOrder',
  authMiddleware,
  verifyRoles(['admin']),
  ordercontroller.OrderLoad
);

router.put(
  '/generateInvoice',
  authMiddleware,
  verifyRoles(['admin']),
  ordercontroller.generateOrderInvoice
);

router.get(
  '/searchOrder',
  authMiddleware,
  verifyRoles(['cic', 'whm', 'admin']),
  ordercontroller.searchOrder
);

export default router;
