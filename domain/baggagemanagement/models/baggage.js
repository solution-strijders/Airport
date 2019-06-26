const mongoose = require('../config/database');

<<<<<<< HEAD
const baggageSchema = new mongoose.Schema({
    //TODO: Add plane
    Weight: {
        type: Number,
        required: true,
        min: 0
=======
const flightSchema = require('./flight').schema;

const baggageSchema = new mongoose.Schema({
    Weight: {
        type: Number,
        required: true,
        minlength: 1
    },
    Flight: {
        type: flightSchema
>>>>>>> 3d682cf859fd0519cdb74bf78c1b55cb8d925f94
    }
});

const Baggages = mongoose.model('Baggages', baggageSchema);

module.exports = Baggages; 