// loanRoutes.js

const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Check eligibility route
router.post('/check-eligibility', loanController.checkEligibility);

// Create loan route
router.post('/create-loan', loanController.createLoan);

// View loan details route
router.get('/view-loan/:loan_id', loanController.viewLoan);

// Make payment route
router.post('/make-payment/:customer_id/:loan_id', loanController.makePayment);

// View loan statement route
router.get('/view-statement/:customer_id/:loan_id', loanController.viewStatement);


module.exports = router;
