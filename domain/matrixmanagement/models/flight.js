const mongoose = require('../config/database');

const planeSchema = require('../models/plane').schema;
const airlineSchema = require('../models/airline').schema;
const passengerSchema = require('../models/passenger').schema;
const baggageSchema = require('../models/bagage').schema;

const flightSchema = new mongoose.Schema({
    FlightNumber: {
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
    },
    Baggage: {
        type: [baggageSchema]
    },
    Origin: {
        type: String
    },
    Destination: {
        type: String
    },
    Gate: {
        type: String
    },
    Status: {
        type: String,
        enum: [
            'Landing',      // Requesting to land.
            'Landed',       // Landed.
            'CheckIn',      // Ready to check in.
            'Boarding',     // Passengers are boarding
            'Delayed',      // Delayed status for matrix.
            'Departing',    // Requesting to depart.
            'Departed'      // Departed out of application scope.
        ]
    },
    LandingApproved: {
        type: Boolean
    },
    TakeoffApproved: {
        type: Boolean
    },
    CurrentPassengers: {
        type: Number
    },
    DepartDateTime: {
        type: Date
    }
});

const Flights = mongoose.model('Flights', flightSchema);

module.exports = Flights; 