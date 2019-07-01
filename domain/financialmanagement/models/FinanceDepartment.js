//Name
//RecieptList

const mongoose = require('../config/database');
const billSchema = require('../models/bill').schema;

const departmentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    ReceiptList: {
        type: [billSchema]
    }
});

const FinanceDepartment = mongoose.model('FinanceDepartment', departmentSchema);

module.exports = FinanceDepartment; 