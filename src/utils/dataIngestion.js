const xlsx = require('xlsx');
const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig');
const path = require('path');
const filePath = path.join(__dirname, 'utils', 'data', 'customer_data.xlsx');



async function ingestCustomerData(filePath) {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        const connection = await mysql.createConnection(dbConfig);

        for (const record of data) {
            await connection.execute(
                `INSERT INTO Customer (first_name, last_name, phone_number, monthly_salary, approved_limit, current_debt) VALUES (?, ?, ?, ?, ?, ?)`,
                [record.first_name, record.last_name, record.phone_number, record.monthly_salary, record.approved_limit, record.current_debt]
            );
        }

        await connection.end();

        console.log('Customer data ingestion completed.');
    } catch (error) {
        console.error('Error ingesting customer data:', error);
    }
}

module.exports = { ingestCustomerData };
