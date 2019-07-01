const mongoose = require('../config/database');

const planeSchema = require('../models/plane').schema;
const airlineSchema = require('../models/airline').schema;
const passengerSchema = require('../models/passenger').schema;
const bagageSchema = require('../models/baggage').schema;


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
    Baggage:{
        type: [bagageSchema]
    },
    Origin: {
        type: String
    },
    Destination: {
        type: String
    },
    Gate:{
        type: String
    },
    Status:{
        type: String
    },
    CurrentPassengers:{
        type: Number
    },
    DepartDateTime:{
        type: Date
    }
});

const Flights = mongoose.model('Flights', flightSchema);

module.exports = Flights; 