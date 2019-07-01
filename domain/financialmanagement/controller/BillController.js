const Bill = require("../models/bill");

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
    }
}