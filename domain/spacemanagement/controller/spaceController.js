const Space = require("../models/space");

module.exports = {
    Index(req, res, next){
        Space.find({}, function (err, docs) {
            if (!err) {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: docs
                }).end();
            } else { throw err; }
        });
    },
    Create(req, res, next){
        const params = {
            Name: req.body.Name,
            SpaceType: "Free room",
            Status: "Available"
        }

        Space.create(params)
            .then(spaces => res.send(spaces))
            .catch(next);
    },
    ReserveSpace(req, res, next){
        const params = {
            SpaceType: req.body.SpaceType,
            Status: "Taken",
        }

        Space.findByIdAndUpdate(req.params.id, params, {new: true})
            .then(spaces => res.send(spaces))
            .catch(next)
    }
}