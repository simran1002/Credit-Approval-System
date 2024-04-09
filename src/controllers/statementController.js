const mysql = require('mysql2/promise');
const dbConfig = require('../utils/dbConfig');
const Loan = require('../models/Loan'); // Import Loan model or service

async function viewStatement(req, res, next) {
    try {
        const { customer_id, loan_id } = req.params;

        // Fetch loan statement data from the database based on customer_id and loan_id
        const loanStatement = await Loan.findOne({ customer_id, loan_id });

        if (!loanStatement) {
            return res.status(404).json({ error: 'Loan statement not found' });
        }

        // Prepare response body
        const statement = {
            customer_id: loanStatement.customer_id,
            loan_id: loanStatement.loan_id,
            principal: loanStatement.principal,
            interest_rate: loanStatement.interest_rate,
            amount_paid: loanStatement.amount_paid,
            monthly_installment: loanStatement.monthly_installment,
            repayments_left: loanStatement.repayments_left
        };

        res.status(200).json(statement);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    viewStatement
};
