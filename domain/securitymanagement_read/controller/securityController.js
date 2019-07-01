const Event = require("../models/event");

module.exports = {
    GetEvents(req, res, next) {
        Event.find({}, function(err, events){
            if(!err){
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: events
                })
            }
        })
    }
}