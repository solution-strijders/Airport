//Reciever
//Space Name
const mongoose = require('../config/database');

const billSchema = new mongoose.Schema({
    SpaceID: {
        type: String
    },
    PassengerName: {
        type: String,
    },
    Amount: {
        type: Number,
        required: true
    },
    BillType: {
        type: String,
    }
});

const Bills = mongoose.model('Bills', billSchema);

module.exports = Bills; 