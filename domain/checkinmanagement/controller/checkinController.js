const rabbot = require("../rabbot/rabbot");
const Flight = require("../models/flight");
const CheckIn = require("../models/checkin");
const Passenger = require('../models/passenger');

module.exports = {
    CheckIn(req, res, next) {
        Passenger.create({
            Name: req.body.Name,
            Age: req.body.Age,
            JoinedFlightID: req.body.Flight 
        }, function(err, passenger){

            CheckIn.create({
                CheckInNumber: req.body.CheckInNumber,
                Flight: req.body.Flight,
                Passenger: passenger
            }, function(err, checkIn){
                if(!err) {
                    rabbot.publish("ex.1", {
                        routingKey: "checkinNoted",
                        type: "checkinNoted",
                        body: checkIn
                    });
                    res.status(200).json({
                        status: {
                            query: 'CheckIn created.'
                        },
                        result: checkIn
                    });
                } else{
                    res.status(401).json({
                        status: {
                            query: 'Not OK'
                        }
                    })
                }
            })
        });
    },
    GetCheckIns(req, res, next) {
        Flight.findById({_id: req.params.id}, function(err, flight) {
            CheckIn.find({Flight: flight}, function(err, checkIns) {
                if(!err) {
                    res.status(200).json({
                        result: checkIns
                    }).end();
                }
            });
        });
    }
}