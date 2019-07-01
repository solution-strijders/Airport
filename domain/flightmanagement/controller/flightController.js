const rabbot = require("../rabbot/rabbot");

const User = require("../models/users");
const Baggage = require("../models/baggage");
const Flight = require('../models/flight');
const Airline = require('../models/airline');
const Plane = require('../models/plane');

module.exports = {
    GetFlight(req, res, next) {
        Flight.findById({ _id: req.params.id })
            .then((result, err) => {
                if (result && !err) {
                    res.status(200);
                    res.send(result);
                } else {
                    res.send(err);
                }
            });
    },

    GetFlights(req, res, next) {
        Flight.find()
            .then((result, err) => {
                if (!err) {
                    res.status(200);
                    res.send(result);
                }
            });
    },

    ChangeStatus(req, res, next) {
        const flight = Flight.findById(req.params.id);

        if (req.body.Status == 'Departing') {
            if (!flight.Plane.IsFueled || !flight.Plane.IsBaggageStowed) {
                res.status(401).json({ message: "Flight isn't fueled or baggage isn't stowed." });
                return;
            }
        }

        if (req.body.Status == 'Departed') {
            if (!flight.TakeoffApproved) {
                res.status(401).json({ message: "Flight can't depart if not approved by control tower." });
            }
        }

        if (req.body.Status == 'Landed') {
            if (!flight.LandingApproved) {
                res.status(401).json({ message: "Flight can't land if not approved by control tower." });
            }
        }

        Flight.findByIdAndUpdate({ _id: req.params.id }, { Status: req.body.Status })
            .then((result, err) => {
                if (result && !err) {
                    rabbot.publish("ex.1", {
                        routingKey: "planeNoted",
                        type: "planeNoted",
                        body: result
                    });

                    rabbot.publish("ex.1", {
                        routingKey: "statusChanged",
                        type: "statusChanged",
                        body: {
                            _id: req.params.id,
                            Status: flight.Status,
                        }
                    });

                    res.status(200);
                    res.send(result);
                } else {
                    res.send(err);
                }
            });
    },

    PostFlight(req, res, next) {
        Plane.findById({ _id: req.body.Plane }, function (err, plane) {
            Airline.findById({ _id: req.body.Airline }, function (err, airline) {
                Flight.create({
                    FlightNumber: req.body.FlightNumber,
                    Origin: req.body.Origin,
                    Plane: plane,
                    Airline: airline,
                    Destination: req.body.Destination,
                    Gate: req.body.Gate,
                    CurrentPassengers: 0,
                    DepartDateTime: req.body.DepartDateTime
                }, function (err, flight) {
                    if (!err) {
                        rabbot.publish("ex.1", {
                            routingKey: "flightNoted",
                            type: "flightNoted",
                            body: flight
                        });

                        res.status(200).json({
                            status: {
                                query: 'OK'
                            },
                            result: flight
                        });
                    } else {
                        res.send(err);
                    }
                })
            })
        })
    },

    PostPlane(req, res, next) {
        Plane.create({
            Name: "Boeing 747-Max",
            CarryCapacity: 100,
            PassengerLimit: 75
        }, function (err, plane) {
            if (!err) {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: plane
                })
            }
        })
    },

    PostAirline(req, res, next) {
        Plane.findById({ _id: req.body.plane }, function (err, plane) {
            Airline.create({
                Name: "KLM",
                Fleet: [plane]
            }, function (err, airline) {
                if (!err) {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: airline
                    })
                }
            })
        })
    }
}