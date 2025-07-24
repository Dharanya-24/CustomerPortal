const express = require('express');
const router = express.Router();
const { getCustomerProfile } = require('../controllers/profileController');

router.get('/profile', getCustomerProfile);

module.exports = router;

