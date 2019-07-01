const Flight = require("../models/flight");
const rabbot = require("../config/rabbot");

module.exports = {
    index(req, res, next) {
        Flight.find()
            .or([{ Status: 'Landing' }, { Status: 'Departing' }])
            .then(flights => res.status(200).json({
                status: { query: 'OK' },
                result: flights
            }))
            .catch(next);
    },

    read(req, res, next) {
        const objectId = req.params.id;

        Flight.findById(objectId)
            .orFail(() => Error('Not found'))
            .then(flight => res.status(200).json({
                status: { query: 'OK' },
                result: flight
            }))
            .catch(next);
    },

    approveTakeoff(req, res, next) {
        const objectId = req.params.id;
        const objectProps = {
            Status: 'Landed',
            TakeoffApproved: true,
        };

        Flight.findByIdAndUpdate(objectId, objectProps, { new: true })
            .and({ Status: 'Departing' })
            .orFail(() => Error('Not found'))
            .then(flight => {
                rabbot.publish("ex.1", {
                    routingKey: "takeoffApproved",
                    type: "takeoffApproved",
                    body: flight
                });

                res.status(200).json({
                    status: { query: 'OK' },
                    result: flight
                });
            })
            .catch(next);
    },

    approveLanding(req, res, next) {
        const objectId = req.params.id;
        const objectProps = {
            Status: 'Landed',
            LandingApproved: true,
        };

        Flight.findByIdAndUpdate(objectId, objectProps, { new: true })
            .and({ Status: 'Landing' })
            .orFail(() => Error('Not found'))
            .then(flight => {
                rabbot.publish("ex.1", {
                    routingKey: "landingApproved",
                    type: "landingApproved",
                    body: flight
                });

                res.status(200).json({
                    status: { query: 'OK' },
                    result: flight
                })
            })
            .catch(next);
    }
}