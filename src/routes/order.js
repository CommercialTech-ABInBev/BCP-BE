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
    verifyRoles(['cic', 'dist', 'whm']),
    ordercontroller.getOrders
);

router.get(
    '/getDepotOrders',
    authMiddleware,
    verifyRoles(['whm', 'dist']),
    ordercontroller.getWHMOrders
);

router.get(
    '/getSpecificOrder',
    authMiddleware,
    verifyRoles(['cic', 'dist', 'whm']),
    ordercontroller.queryOrderByCondition
);

router.get(
    '/downloadOrders',
    authMiddleware,
    verifyRoles(['cic', 'dist']),
    ordercontroller.csvDownloadOrders
);

router.put(
    '/pickOrder',
    authMiddleware,
    verifyRoles(['whm', 'dist']),
    ordercontroller.pickOrder
);

router.post(
    '/loadOrder',
    authMiddleware,
    verifyRoles(['dist']),
    ordercontroller.OrderLoad
);

router.put(
    '/generateInvoice',
    authMiddleware,
    verifyRoles(['dist']),
    ordercontroller.generateOrderInvoice
);

router.get(
    '/searchOrder',
    authMiddleware,
    verifyRoles(['cic', 'whm', 'dist']),
    ordercontroller.searchOrder
);

router.put(
    '/cancelOrder',
    authMiddleware,
    verifyRoles(['cic']),
    ordercontroller.cancelOrder
);

router.put(
    '/replanOrder',
    authMiddleware,
    verifyRoles(['dist']),
    ordercontroller.replanOrder
);

export default router;