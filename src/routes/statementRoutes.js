// statementRoutes.js

const express = require('express');
const router = express.Router();
const statementController = require('../controllers/statementController');

// View statement route
router.get('/:customer_id/:loan_id', statementController.viewStatement);

module.exports = router;
