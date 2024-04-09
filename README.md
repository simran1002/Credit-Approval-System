# Credit Approval System

Credit Approval System is a Node.js application built with Express.js framework for managing loans and customer data, along with an API for loan approval and payment processing.

## Setup and Initialization

### Setup

- Node.js with Express.js framework is used for the backend.
- No frontend is required for this application.
- Data models are built to handle customer and loan data.
- The application and its dependencies are dockerized.
- MySQL or PostgreSQL database is used for data persistence.

### Initialization

- Initial data ingestion is done from provided Excel files (`customer_data.xlsx` and `loan_data.xlsx`) using background workers.

## API Endpoints
1. /register
2. /check-eligibility
3. /create-loan
4. /view-loan/:loan_id
5. /make-payment/:customer_id/:loan_id
6. /view-statement/:customer_id/:loan_id