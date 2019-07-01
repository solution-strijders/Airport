const Flight = require("../models/flight");
const rabbit = require('../rabbot/rabbot');
const Baggage = require("../models/baggage");
const Plane = require("../models/plane");
const Airline = require("../models/airline");
const Passenger = require("../models/passenger");

module.exports = {
    RetrieveFromFlight(req, res, next) {
        Flight.findById({_id: req.params.id}, function(err, flight) {
            Baggage.find({Flight: flight}, function(err, baggages){
                if(!err){
                res.status(200).json({
                    status: {
                        query: 'Baggage retrieved.'
                    },
                    result: baggages
                }).end();
                }
            })
        })
    },
    Stow(req, res, next) {
        Flight.findById({_id: req.params.id}, function(err, flight){

            var plane = flight.Plane;
            plane.IsBaggageStowed = true;
            plane.save();

            rabbit.publish("ex.1", {
                routingKey: "baggageStowed",
                type: "baggageStowed",
                body: {
                    _id: flight._id, 
                    plane: plane
                }
            });

            flight.remove();
            res.status(200).json({
                query: 'OK'
            })
        })
    },
    GetListOfFlights(req, res, next){
        Flight.find({}, function(err, flights){
            res.status(200).json({
                status: {
                    query: 'Flights retrieved'
                },
                result: flights
            }).end();
        })
    }
}