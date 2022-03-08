const { Router } = require('express');
const { AddData } = require('../controllers');
const { csvUpload } = require('../middlewares');
const router = Router();

const {
  resetCustomerDB,
  createBulkCustomers,
  getAllEligibleCustomers,
} = AddData;

router.delete('/reset', resetCustomerDB);
router.get('/customer', getAllEligibleCustomers);
router.post('/createBulkUser', csvUpload.single('file'), createBulkCustomers);

module.exports = router;