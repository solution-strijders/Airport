const Flight = require("../models/flight");
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
                res.status(200).json({
                    status: {
                        query: 'Baggage stowed.'
                    },
                    result: baggage
                }).end();
                }
            })
        })
    },
    Test(req, res, next){
        Plane.create({
            Name: "TestPlane",
            CarryCapacity: 100,
            PassengerLimit: 200
        }, function(err, plane){
            Airline.create({
                Name: "TestAirline",
                Fleet: [plane, plane]
            }, function(err, airline) {
                Passenger.create({
                    Name: "Testo",
                    Age: 42
                }, function(err, passenger) {
                    Flight.create({
                        Name: "TestFlight",
                        Plane: plane,
                        Airline: airline,
                        Passengers: [passenger]
                    }, function(err, flight) {
                        if(!err){
                            res.status(200).json({
                                status: {
                                    query: 'Flight created.'
                                },
                                result: flight
                            }).end();
                        }
                    });
                });
            });
        });
    }
}