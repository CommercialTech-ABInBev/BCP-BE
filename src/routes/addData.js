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
  resetInventoriesDB
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


module.exports = router;