const plane = require("../models/plane");
const rabbot = require("../config/rabbot");

module.exports = {
    index(req, res, next) {
        plane.find({})
            .then(planes => res.status(200).json({
                status: { query: 'OK' },
                result: planes
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
        flight.findById({_id: req.body._id}, function(err, result) {
            if (!err) {
                var plane = flight.plane;
                plane.isFueled = true;
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