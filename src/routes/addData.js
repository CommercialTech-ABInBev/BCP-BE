import { Router } from 'express';
import { AddData } from '../controllers';
import { csvUpload } from '../middlewares';
const router = Router();

const {
  resetCustomerDB,
  createBulkCustomers,
  getAllEligibleCustomers,
  createBulkAddress,
  getAllEligibleAddress,
  resetAddressDB,
  createBulkTruck,
  getAllEligibleTrucks,
  resetTruckDB,
  createBulkInventories,
  getAllEligibleInventories,
  resetInventoriesDB,
  createBulkBalance,
  getAllEligibleBalance,
  resetBalanceDB,
  createBulkStockPrice,
  getAllEligibleStockPrice,
  resetStockPriceDB,
  getSingleCustomer,
  searchForCustomer,
  getruckByDepot,
} = AddData;

router.get('/truckByDepot', getruckByDepot); // ?query=B0
router.delete('/cust/reset', resetCustomerDB);
router.get('/customers', getAllEligibleCustomers);
router.get('/customer', getSingleCustomer); // ?customerId=3
router.get('/customer/search', searchForCustomer); // ?query=3
router.post(
  '/cust/createBulkUser',
  csvUpload.single('file'),
  createBulkCustomers
);
router.delete('/address/reset', resetAddressDB);
router.get('/address', getAllEligibleAddress);
router.post('/address', csvUpload.single('file'), createBulkAddress);
router.delete('/truck/reset', resetTruckDB);
router.get('/trucks', getAllEligibleTrucks);
router.post('/trucks', csvUpload.single('file'), createBulkTruck);
router.delete('/inventories/reset', resetInventoriesDB);
router.get('/inventories', getAllEligibleInventories);
router.post('/inventories', csvUpload.single('file'), createBulkInventories);
router.delete('/balance/reset', resetBalanceDB);
router.get('/balance', getAllEligibleBalance);
router.post('/balance', csvUpload.single('file'), createBulkBalance);
router.delete('/stockprice/reset', resetStockPriceDB);
router.get('/stockprice', getAllEligibleStockPrice);
router.post('/stockprice', csvUpload.single('file'), createBulkStockPrice);

export default router;
