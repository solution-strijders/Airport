const Plane = require("../models/plane");
const rabbot = require("../config/rabbot");

module.exports = {
    index(req, res, next) {
        Plane.find({})
            .then(planes => res.status(200).json({
                status: { query: 'OK' },
                result: planes
            }))
            .catch(next);
    },

    read(req, res, next) {
        const objectId = req.params.id;

        Plane.findById(objectId)
            .orFail(() => Error('Not found'))
            .then(plane => res.status(200).json({
                status: { query: 'OK' },
                result: plane
            }))
            .catch(next);
    },

    approveFuel(req, res, next) {
        const objectId = req.params.id;
        const objectProps = {
            FuelApproved: true
        };

        Plane.findByIdAndUpdate(objectId, objectProps, { new: true })
            .orFail(() => Error('Not found'))
            .then(plane => {
                rabbot.publish("ex.1", {
                    routingKey: "fuelApproved",
                    type: "fuelApproved",
                    body: plane
                });

                res.status(200).json({
                    status: { query: 'OK' },
                    result: plane
                });
            })
            .catch(next);
    }
}