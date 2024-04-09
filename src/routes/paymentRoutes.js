// paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Make payment route
router.post('/:customer_id/:loan_id', paymentController.makePayment);

module.exports = router;
