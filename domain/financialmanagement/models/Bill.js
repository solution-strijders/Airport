//Reciever
//Space Name
const mongoose = require('../config/database');

const billSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    BillType: {
        type: String,
    }
});

const Bills = mongoose.model('Bills', billSchema);

module.exports = Bills; 