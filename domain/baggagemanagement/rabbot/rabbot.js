const rabbot = require("rabbot");
const Flight = require('../models/flight');
const Passenger = require('../models/passenger');
const Plane = require('../models/plane');
require("dotenv").config();

rabbot
    .configure({
        connection: {
            name: "default",
            user: process.env.RABBIT_USER,
            pass: process.env.RABBIT_PASS,
            host: process.env.RABBIT_HOST,
            port: 5672,
            vhost: "%2f",
            replyQueue: false
        },
        exchanges: [{ name: "ex.1", type: "direct", autoDelete: false }],
        queues: [
            {
                name: "baggagemanagement_queue",
                autoDelete: false,
                durable: true,
                subscribe: true
            }
        ],
        bindings: [
            {
                exchange: "ex.1",
                target: "baggagemanagement_queue",
                keeys: ["passengerChecked", "flightNoted", "fuelApproved"]
            }
        ]
    })
    .then(() => {
        console.log("Rabbot succesfully connected.");
        rabbot.startSubscription("baggagemanagement_queue");
        console.log("Rabbot subscribed.");
    })
    .catch(error => console.log("Rabbot connect error: " + error));

    rabbot.handle("flightNoted", msg => {
        console.log(msg.body);
        Flight.create({
            _id: msg.body._id,
            FlightNumber: msg.body.FlightNumber,
            Plane: msg.body.Plane,
            Airline: msg.body.Airline,
            Passengers: msg.body.Passengers,
            Baggage: msg.body.Baggage,
            Origin: msg.body.Origin,
            Destination: msg.body.Destination,
            Gate: msg.body.Gate,
            Status: msg.body.Status,
            CurrentPassengers: msg.body.CurrentPassengers,
            DepartDateTime: msg.body.DepartDateTime
        }, function (err, flight) {
            if (!err) {
                console.log("ack");
                msg.ack();
            } else {
                console.log("nack");
                msg.nack();
            }
        })
    });
    
    rabbot.handle("passengerChecked", msg => {
        console.log("passengerChecked");
    
        Flight.findById({ _id: msg.body.Passenger.JoinedFlightID }, function (err, flight) {
            baggage.create({
                Weight: 1,
                Flight: flight
            }, function (err, baggage) {
                if (!err) {
                    flight.Baggage.add(baggage);
                    flight.save();
    
                    msg.ack();
                } else {
                    msg.nack();
                }
            })
        });
    });
    
    
    rabbot.handle("fuelApproved", msg => {
        console.log(msg.body);
    
        Flight.findById({_id: msg.body._id}, function(err, flight){
            if(!err){
                if(flight == null){
                    msg.ack();
                } else{

                flight.Plane = msg.body.plane;
                flight.save();
                msg.ack();
                }
            } else{
                console.log("failed");
                msg.nack();
            }
        })
    });
    
    module.exports = rabbot;