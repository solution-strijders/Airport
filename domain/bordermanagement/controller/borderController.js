const Passenger = require("../models/passenger");

module.exports = {
    GetPassengers(req, res, next) {
        Passenger.find({}, function (err, passengers) {
            if (!err) {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: passengers
                }).end();
            } else { throw err; }
        });
    },
    CreatePassenger(req, res, next) {
        Passenger.create({
            Name: req.body.name,
            Age: req.body.age
        }, function(err, passenger){
            if(!err){
                rabbit.publish("ex.1", {
                    routingKey: "passengerNoted",
                    type: "passengerNoted",
                    body: passenger
                 });
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: passenger
                })
            }
        })
    }
}