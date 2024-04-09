const mysql = require('mysql2/promise');
const dbConfig = require('../utils/dbConfig');
const Loan = require('../models/Loan')

async function checkEligibility(req, res) {
    try {
        const { customer_id, loan_amount, interest_rate, tenure } = req.body;

        // Calculate credit score based on provided criteria
        let creditScore = 0;

        // Logic to calculate credit score based on historical loan data
        // You need to implement this logic based on the given components

        // Determine loan approval and interest rate based on credit score
        let approval = false;
        let correctedInterestRate = interest_rate;

        if (creditScore > 50) {
            approval = true;
        } else if (50 >= creditScore > 30) {
            correctedInterestRate = Math.max(interest_rate, 12);
            approval = true;
        } else if (30 >= creditScore > 10) {
            correctedInterestRate = Math.max(interest_rate, 16);
            approval = true;
        }

        // Check if sum of all current EMIs > 50% of monthly salary
        // Logic to check sum of current EMIs and monthly salary

        // Calculate monthly installment
        const monthlyInstallment = calculateMonthlyInstallment(loan_amount, correctedInterestRate, tenure);

        // Prepare response data
        const responseData = {
            customer_id: customer_id,
            approval: approval,
            interest_rate: interest_rate,
            corrected_interest_rate: correctedInterestRate,
            tenure: tenure,
            monthly_installment: monthlyInstallment
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error checking loan eligibility:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function calculateMonthlyInstallment(loanAmount, interestRate, tenure) {
    // Logic to calculate monthly installment based on loan amount, interest rate, and tenure
    // You need to implement this calculation
    return monthlyInstallment;
}


async function createLoan(req, res) {
    try {
        const { customer_id, loan_amount, interest_rate, tenure } = req.body;

        // Check eligibility based on credit score and other criteria
        const eligibilityData = await checkEligibility(customer_id, loan_amount, interest_rate, tenure);

        // Process loan based on eligibility
        let loanId = null;
        let loanApproved = false;
        let message = '';

        if (eligibilityData.approval) {
            // Insert loan details into the database
            // Logic to insert loan details and get loanId
            loanId = insertLoanDetails(customer_id, loan_amount, interest_rate, tenure);

            if (loanId) {
                loanApproved = true;
                message = 'Loan created successfully';
            } else {
                message = 'Error creating loan';
            }
        } else {
            message = 'Loan not approved based on eligibility criteria';
        }

        // Calculate monthly installment
        const monthlyInstallment = calculateMonthlyInstallment(loan_amount, interest_rate, tenure);

        // Prepare response data
        const responseData = {
            loan_id: loanId,
            customer_id: customer_id,
            loan_approved: loanApproved,
            message: message,
            monthly_installment: monthlyInstallment
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function checkEligibility(customer_id, loan_amount, interest_rate, tenure) {
    // Implement logic to check eligibility based on credit score and other criteria
    let eligibilityData = {};

    try {
        // Assuming you have functions to retrieve historical loan data and calculate credit score
        const historicalLoanData = await retrieveHistoricalLoanData(customer_id);
        const creditScore = calculateCreditScore(historicalLoanData);

        // Check credit score against eligibility criteria
        let approval = false;
        let correctedInterestRate = interest_rate;
        let monthly_installment = calculateMonthlyInstallment(loan_amount, interest_rate, tenure);

        if (creditScore > 50) {
            approval = true;
        } else if (creditScore > 30) {
            correctedInterestRate = Math.max(interest_rate, 12);
            approval = true;
        } else if (creditScore > 10) {
            correctedInterestRate = Math.max(interest_rate, 16);
            approval = true;
        }

        eligibilityData = {
            customer_id: customer_id,
            approval: approval,
            interest_rate: interest_rate,
            corrected_interest_rate: correctedInterestRate,
            tenure: tenure,
            monthly_installment: monthly_installment
        };
    } catch (error) {
        console.error('Error checking eligibility:', error);
        throw error; // Rethrow the error for the caller to handle
    }

    return eligibilityData;
}


function insertLoanDetails(customer_id, loan_amount, interest_rate, tenure) {
    // Logic to insert loan details into the database and return the loanId
    let loanId = null;

    try {
        // Assuming you have a function to insert data into the database
        // Insert loan details into the database and get the inserted loan ID
        loanId = insertLoanIntoDatabase(customer_id, loan_amount, interest_rate, tenure);
    } catch (error) {
        console.error('Error inserting loan details:', error);
        throw error; // Rethrow the error for the caller to handle
    }

    return loanId;
}

function calculateMonthlyInstallment(loanAmount, interestRate, tenure) {
    // Logic to calculate monthly installment based on loan amount, interest rate, and tenure
    const monthlyInterestRate = interestRate / 12 / 100; // Convert annual interest rate to monthly and percentage to decimal
    const numberOfPayments = tenure * 12; // Convert tenure from years to months

    // Calculate monthly installment using the formula for compound interest
    const monthlyInstallment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    return monthlyInstallment;
}


// loanController.js
async function viewLoan(req, res) {
    try {
        const loanId = req.params.loan_id;

        // Fetch loan details from the database
        const loanDetails = await fetchLoanDetails(loanId);

        if (!loanDetails) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        // Fetch customer details associated with the loan
        const customerDetails = await fetchCustomerDetails(loanDetails.customer_id);

        // Prepare response data
        const responseData = {
            loan_id: loanDetails.loan_id,
            customer: {
                id: customerDetails.customer_id,
                first_name: customerDetails.first_name,
                last_name: customerDetails.last_name,
                phone_number: customerDetails.phone_number,
                age: customerDetails.age
            },
            loan_approved: loanDetails.loan_approved,
            loan_amount: loanDetails.loan_amount,
            interest_rate: loanDetails.interest_rate,
            monthly_installment: loanDetails.monthly_installment,
            tenure: loanDetails.tenure
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching loan details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    checkEligibility, createLoan,viewLoan
};
