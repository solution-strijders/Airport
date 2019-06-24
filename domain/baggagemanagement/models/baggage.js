const mongoose = require('../config/database');

const baggageSchema = new mongoose.Schema({
    //TODO: Add plane
    Weight: {
        type: Number,
        required: true,
        min: 0
    }
});

const Baggages = mongoose.model('Baggages', baggageSchema);

module.exports = Baggages; 