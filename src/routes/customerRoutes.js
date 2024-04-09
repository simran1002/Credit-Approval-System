// customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Register route
router.post('/register', customerController.registerCustomer);

module.exports = router;
