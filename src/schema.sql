CREATE TABLE Customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(15),
    monthly_salary DECIMAL(10, 2),
    approved_limit DECIMAL(10, 2),
    current_debt DECIMAL(10, 2)
);

CREATE TABLE Loan (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    loan_amount DECIMAL(10, 2),
    tenure INT,
    interest_rate DECIMAL(5, 2),
    monthly_repayment DECIMAL(10, 2),
    emis_paid_on_time INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
