const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/invoices/:customerId', invoiceController.fetchAndSaveInvoices);

module.exports = router;


