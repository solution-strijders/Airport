const Flight = require("../models/flight");

module.exports = {
    index(req, res, next) {
        Flight.findById({})
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
        const threadId = req.params.id;
        const threadProps = {
            TakeoffApproved: true
        };

        Flight.findByIdAndUpdate(threadId, threadProps, { new: true })
            .orFail(() => Error('Not found'))
            .then(flight => res.status(200).json({
                status: { query: 'OK' },
                result: flight
            }))
            .catch(next);
    },

    approveLanding(req, res, next) {
        const threadId = req.params.id;
        const threadProps = {
            LandingApproved: true
        };

        Flight.findByIdAndUpdate(threadId, threadProps, { new: true })
            .orFail(() => Error('Not found'))
            .then(flight => res.status(200).json({
                status: { query: 'OK' },
                result: flight
            }))
            .catch(next);
    }
}