const Baggage = require("../models/bagage");

module.exports = {
    Claim(req, res, next) {
        Baggage.find({}, function (err, docs) {
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
    Store(req, res, next) {
        var baggage = new Baggage();
        baggage.Weight = req.body.Weight;

        baggage.save(function (err) {
            if (err) console.log(err);
            res.status(200).json({
                status: {
                    query: 'OK'
                },
                result: baggage
            }).end();
        });
    }
}