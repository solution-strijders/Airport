const Event = require("../models/event");
const rabbot = require("../rabbot/rabbot");

module.exports = {
    Index(req, res, next){
        res.status(200).json({
            status: {
                query: 'OK'
            }
        })
    }
}