const mongoose = require('../config/database');

const planeSchema = require('../models/plane').default.schema;
const airlineSchema = require('../models/airline').schema;
const passengerSchema = require('../models/passenger').schema;

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