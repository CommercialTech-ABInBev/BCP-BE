import { Router } from 'express';

import { csvUpload } from '../middlewares';
import { verifyRoles } from '../middlewares/rolemgt';
import { authMiddleware } from '../middlewares/auth';
import { OrderController } from '../controllers/order';
import { validationMiddleware } from '../middlewares/validation';
import {
    queryId,
    searchOrder,
    planLoadSchema,
    createOrderchema,
    paginationSchema,
    rePlanOrderSchema,
    paginateQueryOrder,
} from '../validations/order.validation';

const router = Router();
const ordercontroller = new OrderController();

router.post(
  '/createOrder',
  authMiddleware,
  verifyRoles(['cic', 'superadmin']),
  validationMiddleware(createOrderchema),
  ordercontroller.createOrder
);

router.get(
  '/getOrders',
  authMiddleware,
  verifyRoles(['cic', 'dist', 'whm', 'superadmin']),
  validationMiddleware(paginationSchema),
  ordercontroller.getOrders
);

router.get(
  '/getDepotOrders',
  authMiddleware,
  verifyRoles(['whm', 'dist', 'superadmin']),
  validationMiddleware(paginationSchema),
  ordercontroller.getWHMOrders
);

router.get(
  '/getSpecificOrder',
  authMiddleware,
  verifyRoles(['cic', 'dist', 'whm', 'superadmin']),
  validationMiddleware(paginateQueryOrder),
  ordercontroller.queryOrderByCondition
);

router.get(
  '/downloadOrders',
  authMiddleware,
  verifyRoles(['cic', 'dist', 'whm', 'superadmin']),
  ordercontroller.csvDownloadOrders
);

router.put(
    '/pickOrder',
    authMiddleware,
    verifyRoles(['whm', 'dist', 'cic']),
    validationMiddleware(queryId),
    ordercontroller.pickOrder
);

router.post(
    '/loadOrder',
    authMiddleware,
    verifyRoles(['dist', 'cic']),
    validationMiddleware(planLoadSchema),
    ordercontroller.OrderLoad
);

router.put(
    '/generateInvoice',
    authMiddleware,
    verifyRoles(['dist', 'cic']),
    validationMiddleware(queryId),
    ordercontroller.generateOrderInvoice
);

router.get(
  '/searchOrder',
  authMiddleware,
  verifyRoles(['cic', 'whm', 'dist', 'superadmin']),
  validationMiddleware(searchOrder),
  ordercontroller.searchOrder
);

router.put(
    '/cancelOrder',
    authMiddleware,
    verifyRoles(['cic']),
    validationMiddleware(queryId),
    ordercontroller.cancelOrder
);

router.put(
    '/replanOrder',
    authMiddleware,
    verifyRoles(['dist']),
    validationMiddleware(rePlanOrderSchema),
    ordercontroller.replanOrder
);

router.put(
    '/updateCustomer',
    ordercontroller.updateCustomer
);

router.post(
    '/captureLiveOrders',
    csvUpload.single('file'),
    ordercontroller.orderLiveUpdate
  );

export default router;