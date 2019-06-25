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
            Name: req.body.Name
        }

        Space.create(params)
            .then(spaces => res.send(spaces))
            .catch(next);
    }
}