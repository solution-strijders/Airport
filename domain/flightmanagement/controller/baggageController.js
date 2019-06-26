const User = require("../models/users");
const rabbot = require("../rabbot/rabbot");

module.exports = {
    Get(req, res, next) {
        User.find({}, function (err, docs) {
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
    New(req, res, next) {
        var user = new User({ Name: 'hodor', Age: 420 });

        user.save(function (err, result) {
            if (err) console.log(err);

            rabbot.publish("ex.1", {
                routingKey: "userNoted",
                type: "userNoted",
                body: result
             });
            res.status(200).json({
                status: {
                    query: 'OK'
                },
                result: user
            }).end();
        });
    }
}