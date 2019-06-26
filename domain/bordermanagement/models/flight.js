const mongoose = require('../config/database');

const planeSchema = require('../models/plane');
const airlineSchema = require('../models/airline');
const passengerSchema = require('../models/passenger');

const flightSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 1
    },
    Plane: {
        type: planeSchema
    },
    Airline: {
        type: airlineSchema
    },
    Passengers: {
        type: [passengerSchema]
    }
});

const Flights = mongoose.model('Flights', flightSchema);

module.exports = Flights; 