const Passenger = require("../models/passenger");
const rabbit = require("../rabbot/rabbot");

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
    CheckPassenger(req, res, next) {
        Passenger.findById({_id: req.body.id}, function(err, passenger){
            rabbit.publish("ex.1", {
                routingKey: "passengerChecked",
                type: "passengerChecked",
                body: passenger
            });

            passenger.remove();
            res.status(200).json({
                query: 'OK'
            })
        })
    }
}