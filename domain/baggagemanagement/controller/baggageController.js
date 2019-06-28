const Flight = require("../models/flight");
const rabbot = require('../rabbot/rabbot');
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
            Baggage.create({
                Weight: req.body.weight,
                Flight: flight
            }, function(err, baggage){
                if(!err){
                rabbit.publish("ex.1", {
                        routingKey: "baggageStowed",
                        type: "baggageStowed",
                        body: baggage
                });

                res.status(200).json({
                    status: {
                        query: 'Baggage stowed.'
                    },
                    result: baggage
                }).end();
                }
            })
        })
    }
}