const express = require('express');
const router = express.Router();
const { fetchInquiryData } = require('../controllers/inquiryController');

router.get('/:customerId', fetchInquiryData);

module.exports = router;
