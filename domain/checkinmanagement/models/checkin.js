const mongoose = require('../config/database');

const flightSchema = require('./flight').schema;

const checkInSchema = new mongoose.Schema({
    CheckInNumber: {
        type: Number,
        required: true,
        minlength: 1,
        default: 1
    },
    Flight: {
        type: flightSchema
    }
});

const CheckIns = mongoose.model('CheckIns', checkInSchema);

module.exports = CheckIns;