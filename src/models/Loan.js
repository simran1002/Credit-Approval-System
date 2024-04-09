const { DataTypes } = require('sequelize');
const sequelize = require('../utils/dbConfig');

const Customer = sequelize.define('Customer', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monthly_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  approved_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Loan = sequelize.define('Loan', {
  loan_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tenure: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  interest_rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  emis_paid_on_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Customer.hasMany(Loan);
Loan.belongsTo(Customer);

module.exports = { Customer, Loan };
