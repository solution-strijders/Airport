const mongoose = require('../config/database');

const personnelSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 1
    }
});

const Personnel = mongoose.model('Personnel', personnelSchema);

module.exports = Personnel; 