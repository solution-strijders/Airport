const mongoose = require('../config/database');

const bagageSchema = new mongoose.Schema({
    Weight: {
        type: Number,
        required: true,
        minlength: 1
    }
});

const Bagages = mongoose.model('Bagages', bagageSchema);

module.exports = Bagages; 