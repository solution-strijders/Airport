const User = require("../models/users");
const rabbot = require("../rabbot/rabbot");
const Baggage = require("../models/bagage");
const Flight = require('../models/flight');

module.exports = {
    GetFlight(req,res,next){
        Flight.findById({_id: req.params.id})
        .then((result, err)=> {
            if(result && !err){
                res.status(200);
                res.send(result);
            }else{
                res.send(err);
            }
        });
    },

    ChangeStatus(req,res,next){
        Flight.findByIdAndUpdate({_id: req.params.id}, {Status : req.body.Status})
        .then((result, err)=> {
            if(result && !err){
                res.status(200);
                res.send("Status updated");
            }else{
                res.send(err);
            }
        });
    },

    PostFlight(req,res,next){
        Flight.create({
            FlightNumber: req.body.FlightNumber,
            Origin: req.body.Origin,
            Plane: req.body.Plane,
            Airline: req.body.Airline,
            Destination: req.body.Destination,
            Gate: req.body.Gate,
            CurrentPassengers: 0,
            DepartDateTime: req.body.DepartDateTime
            
        }, function(err, flight){
            if(!err){
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: flight
                })
            }else{
                res.send(err);
            }
        })
    }
}