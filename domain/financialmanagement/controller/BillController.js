const Bill = require("../models/Bill");

module.exports = {
    Index(req, res, next){
        Bill.find({}, function (err, docs) {
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
            BillType: null
        }

        Bill.create(params)
            .then(spaces => {
                rabbot.publish("ex.1", {
                    routingKey: "billNoted",
                    type: "billNoted",
                    body: params
                 });
                 res.send(spaces)
            })
            .catch(next);
    }
}