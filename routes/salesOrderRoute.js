const express = require('express');
const router = express.Router();
const { getSalesOrderData } = require('../controllers/salesOrderController');

router.get('/:customerId', getSalesOrderData);

module.exports = router;
