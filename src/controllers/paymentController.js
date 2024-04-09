// paymentController.js

// Import any necessary modules or services

async function makePayment(req, res, next) {
    try {
        const { customer_id, loan_id } = req.params;
        const { amount } = req.body;

        // 1. Retrieve loan details from the database based on customer_id and loan_id
        const loanDetails = await getLoanDetails(customer_id, loan_id); // Replace with your function to retrieve loan details
        
        // 2. Calculate total amount paid towards the loan so far
        const totalPaidAmount = await getTotalPaidAmount(customer_id, loan_id); // Replace with your function to calculate total paid amount
        
        // 3. Determine total number of EMIs paid and remaining EMIs
        const totalEMIsPaid = calculateTotalEMIsPaid(loanDetails, totalPaidAmount);
        const remainingEMIs = loanDetails.totalEMIs - totalEMIsPaid;
        
        // 4. Calculate total EMI amount
        const totalEMIAmount = loanDetails.totalAmount / loanDetails.totalEMIs;
        
        // 5. Check if the amount being paid is less than, equal to, or more than the due installment amount
        let newEMIAmount = totalEMIAmount;
        if (amount < totalEMIAmount) {
            // If the amount is less than the due installment amount, recalculate the EMI amount
            newEMIAmount = amount;
        }
        
        // 6. Update loan details with the new payment information
        await updateLoanDetails(customer_id, loan_id, {
            totalPaidAmount: totalPaidAmount + amount,
            totalEMIsPaid: totalEMIsPaid + 1,
            remainingEMIs: remainingEMIs > 0 ? remainingEMIs - 1 : 0,
            EMI: newEMIAmount
        }); // Replace with your function to update loan details
        
        // 7. Send response
        res.status(200).json({ message: 'Payment successful', customer_id, loan_id, amount });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    makePayment
};
