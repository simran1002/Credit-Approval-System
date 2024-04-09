// customerController.js

const mysql = require('mysql2/promise');
const dbConfig = require('../utils/dbConfig');

async function registerCustomer(req, res) {
    try {
        const { first_name, last_name, age, monthly_income, phone_number } = req.body;

        // Calculate approved credit limit
        const approved_limit = Math.round(36 * monthly_income);

        // Insert customer into database
        const connection = await mysql.createConnection(dbConfig);
        const [results, fields] = await connection.execute(
            'INSERT INTO Customer (first_name, last_name, age, monthly_income, phone_number, approved_limit) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, age, monthly_income, phone_number, approved_limit]
        );
        await connection.end();

        // Prepare response data
        const responseData = {
            customer_id: results.insertId,
            name: `${first_name} ${last_name}`,
            age: age,
            monthly_income: monthly_income,
            approved_limit: approved_limit,
            phone_number: phone_number
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error registering customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    registerCustomer
};
