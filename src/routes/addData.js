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
} = AddData;

router.delete('/cust/reset', resetCustomerDB);
router.get('/customers', getAllEligibleCustomers);
router.post('/cust/createBulkUser', csvUpload.single('file'), createBulkCustomers);
router.delete('/address/reset', resetAddressDB);
router.get('/address', getAllEligibleAddress);
router.post('/address', csvUpload.single('file'), createBulkAddress);


module.exports = router;