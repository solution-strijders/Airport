const mongoose = require('../config/database');

const baggageSchema = new mongoose.Schema({
    Weight: {
        type: Number,
        required: true,
        minlength: 1
    }
});

const Baggages = mongoose.model('Baggages', baggageSchema);

module.exports = Baggages; 