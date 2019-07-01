const Department = require("../models/financeDepartment");
const Bill = require("../models/bill");
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
    BillSpaces(req, res, next){
        const params = {
            SpaceID: req.body.SpaceID,
            Amount: req.body.Amount,
            BillType: "Space bill"
        }

        Bill.create(params)
            .then(bills => {
                rabbit.publish("ex.1", {
                    routingKey: "spaceBillNoted",
                    type: "spaceBillNoted",
                    body: params
                });
                res.send(bills)
            })
            .catch(next);
    },
    BillPassengers(req, res, next){
        const params = {
            PassengerName: req.body.PassengerName,
            Amount: req.body.Amount,
            BillType: "Passenger bill"
        }

        Bill.create(params)
            .then(bills => {
                rabbit.publish("ex.1", {
                    routingKey: "passengerBillNoted",
                    type: "passengerBillNoted",
                    body: params
                });
                res.send(bills)
            })
            .catch(next);
    }
   
}