const express = require('express');
const router = express.Router();
const { fetchDeliveryList } = require('../controllers/deliveryController');

router.get('/:customerId', fetchDeliveryList);

module.exports = router;

