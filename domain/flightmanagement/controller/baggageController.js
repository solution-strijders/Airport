const User = require("../models/users");
const rabbot = require("../rabbot/rabbot");
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

        baggage.save(function (err, result) {
            if (err) console.log(err);

            rabbot.publish("ex.1", {
                routingKey: "baggageNoted",
                type: "baggageNoted",
                body: result
             });
            res.status(200).json({
                status: {
                    query: 'OK'
                },
                result: baggage
            }).end();
        });
    }
}