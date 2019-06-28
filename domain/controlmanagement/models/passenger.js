const mongoose = require('../config/database');

const passengerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 1
    },
    Age: {
        type: Number
    }
});

const Passengers = mongoose.model('Passengers', passengerSchema);

module.exports = Passengers; 