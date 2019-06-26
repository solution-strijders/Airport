const Plane = require("../models/plane");

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

    edit(req, res, next) {
        const objectId = req.params.id;
        const objectProps = {
            Name: req.body.name,
            Fuel: req.body.fuel,
            Notes: req.body.notes
        };

        Plane.findByIdAndUpdate(objectId, objectProps, { new: true })
            .orFail(() => Error('Not found'))
            .then(plane => res.status(200).json({
                status: { query: 'OK' },
                result: plane
            }))
            .catch(next);
    }
}