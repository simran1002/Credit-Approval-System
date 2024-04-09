const Customer = require('../models/Customer');

async function registerCustomer(customerData) {
    const newCustomer = new Customer(customerData);
    await newCustomer.save();
    return newCustomer;
}

module.exports = {
    registerCustomer
};
