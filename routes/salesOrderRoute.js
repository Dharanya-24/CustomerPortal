const express = require('express');
const router = express.Router();
const { fetchSalesOrderData } = require('../controllers/salesOrderController');

router.get('/sales-order/:customerId', fetchSalesOrderData);

module.exports = router;
