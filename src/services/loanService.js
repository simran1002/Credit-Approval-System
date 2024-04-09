const { Loan } = require('../models/Loan');

async function createLoan(loanData) {
    const newLoan = await Loan.create(loanData);
    return newLoan;
}

module.exports = {
    createLoan
};
