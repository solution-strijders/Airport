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
                name: "flightmanagement_queue",
                autoDelete: false,
                durable: true,
                subscribe: true
            }
        ],
        bindings: [
            {
                exchange: "ex.1",
                target: "flightmanagement_queue",
                keys: ["passengerChecked", "flightNoted", "planeNoted", "statusChanged", "fuelApproved", "baggageStowed"]
            }
        ]
    })
    .then(() => {
        console.log("Rabbot succesfully connected.");
        rabbot.startSubscription("flightmanagement_queue");
        console.log("Rabbot subscribed.");
    })
    .catch(error => console.log("Rabbot connect error: " + error));

rabbot.handle("fuelApproved", msg => {
    console.log(msg.body);

    Flight.findById({_id: msg.body._id}, function(err, flight){
        if(!err){
            flight.Plane = msg.body.plane;
            flight.save();
            msg.ack();
        } else{
            msg.nack();
        }
    })
});


rabbot.handle("baggageStowed", msg => {


    Flight.findById({_id: msg.body._id}, function(err, flight){
        if(!err){
            flight.Plane = msg.body.plane;
            flight.save();

            console.log(flight);

            msg.ack();
        } else{
            msg.nack();
        }
    })
});


rabbot.handle("passengerChecked", msg => {
    Passenger.create({
        Name: msg.body.Name,
        Age: msg.body.Age,
        JoinedFlightID: msg.body.JoinedFlightID
    }, function(err, passenger){
        Flight.findById({_id: passenger.JoinedFlightID}, function(err, flight){
            if(!err){
                flight.Passengers.push(passenger);
                flight.save();
                msg.ack();
            } else{
                msg.nack();
            }

        })
    })
});

rabbot.handle("takeoffApproved", msg => {

    console.log("taking off");
    Flight.findById({_id: msg.body._id}, function(err, flight){
        if(!err){
            flight.Status = "Departed"
            flight.save();

            console.log(flight);

            msg.ack();
        } else{
            msg.nack();
        }
    })
});

module.exports = rabbot;