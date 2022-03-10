const { Router } = require('express');
const { AddData } = require('../controllers');
const { csvUpload } = require('../middlewares');
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
} = AddData;

router.delete('/cust/reset', resetCustomerDB);
router.get('/customers', getAllEligibleCustomers);
router.post('/cust/createBulkUser', csvUpload.single('file'), createBulkCustomers);
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


module.exports = router;