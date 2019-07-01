const rabbot = require("rabbot");
const plane = require("../models/plane");
const flight = require("../models/flight");
require("dotenv").config();

rabbot.configure({
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
            name: "groundmanagement_queue",
            autoDelete: false,
            durable: true,
            subscribe: true
        }
    ],
    bindings: [
        {
            exchange: "ex.1",
            target: "groundmanagement_queue",
            keys: ["fuelApproved"]
        }
    ]
}).then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("groundmanagement_queue");
    console.log("Rabbot subscribed.");
}).catch(error => console.log("Rabbot connect error: " + error));

rabbot.handle("flightNoted", msg => {
    flight.create({
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
            msg.ack();
        } else {
            msg.nack();
        }
    })
});

rabbot.handle("statusChanged", msg => {
    if(msg.body.Status == "Boarding") {
        flight.findById({_id: msg.body._id}, function(err, result) {
            result.Status = msg.body.Status;
            result.save();
        });
    }
    
});

module.exports = rabbot;