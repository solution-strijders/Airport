const plane = require("../models/plane");
const rabbot = require("../config/rabbot");
const flight = require("../models/flight");

module.exports = {
    index(req, res, next) {
        flight.find({})
            .then(flights => res.status(200).json({
                status: { query: 'OK' },
                result: flights
            }))
            .catch(next);
    },

    read(req, res, next) {
        const objectId = req.params.id;

        plane.findById(objectId)
            .orFail(() => Error('Not found'))
            .then(plane => res.status(200).json({
                status: { query: 'OK' },
                result: plane
            }))
            .catch(next);
    },

    approveFuel(req, res, next) {
        flight.findById({_id: req.params.id}, function(err, flight) {
            if (!err) {
                var plane = flight.Plane;
                plane.IsFueled = true;
                plane.save();


                rabbot.publish("ex.1", {
                    routingKey: "fuelApproved",
                    type: "fuelApproved",
                    body: {
                        _id: flight._id, 
                        plane: plane
                    }
                });
                flight.remove();
                res.status(200).json({
                    status: { query: 'OK' }
                });
            }
        });
    }
}