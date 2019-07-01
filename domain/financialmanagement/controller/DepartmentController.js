const Department = require("../models/financeDepartment");
const rabbit = require("../rabbot/rabbot");

module.exports = {
    Index(req, res, next){
        Department.find({}, function (err, docs) {
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
            ReceiptList: null
        }

        Department.create(params)
            .then(spaces => {
                rabbit.publish("ex.1", {
                    routingKey: "financialNoted",
                    type: "financialNoted",
                    body: params
                });
                res.send(spaces)
            })
            .catch(next);
    },
    //TODO: Add bill option (Group and ID)
}