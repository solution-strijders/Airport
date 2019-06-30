const rabbot = require("../rabbot/rabbot");
const Flight = require("../models/flight");
const CheckIn = require("../models/checkin");

module.exports = {
    CheckIn(req, res, next) {
        Flight.findById({_id: req.params.id}, function(err, flight) {
            CheckIn.create({
                CheckInNumber: req.body.CheckInNumber,
                Flight: flight
            }, function(err, checkIn) {
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
                }
            });
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