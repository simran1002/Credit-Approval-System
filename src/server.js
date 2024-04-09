const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const cron = require('node-cron');
const { ingestCustomerData, ingestLoanData } = require('./utils/dataIngestion'); // Import ingestLoanData function

// Define an async function to run the data ingestion for customers
async function runDataIngestion() {
    try {
        const filePath = 'customer_data.xlsx'; // Provide the correct path to your Excel file
        await ingestCustomerData(filePath);
    } catch (error) {
        console.error('Error during data ingestion:', error);
    }
}

// Call the async function to start the data ingestion process
runDataIngestion();

// Schedule data ingestion task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running data ingestion task...');
    await runDataIngestion();
});

// Middleware
app.use(express.json());

// Define routes
const customerRoutes = require('./routes/customerRoutes');
const loanRoutes = require('./routes/loanRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const statementRoutes = require('./routes/statementRoutes'); // Include statement routes

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/statements', statementRoutes); // Use statement routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
