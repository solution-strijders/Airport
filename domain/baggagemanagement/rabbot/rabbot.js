const rabbot = require("rabbot");
const flight = require('../models/flight');
const passenger = require('../models/passenger');
const plane = require('../models/plane');
const baggage = require('../models/baggage');
require("dotenv").config();

rabbot
    .configure({
        connection: {
            name: "default",
            user: process.env.RABBIT_USER,
            pass: process.env.RABBIT_PASS,
            host: process.env.RABBIT_HOST,
            timeout: 3000,
            retryLimit: 3,
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
                keys: ["passengerChecked", "flightNoted", "statusChanged", "baggageStowed"]
            }
        ]
    })
    .then(() => {
        console.log("Rabbot succesfully connected.");
        rabbot.startSubscription("baggagemanagement_queue");
        console.log("Rabbot subscribed.");
    })
    .catch(error => console.log("Rabbot connect error: " + error));

rabbot.on("unreachable", function () {
    console.log("asdasdas");
    rabbot.retry();
});

rabbot.handle("flightNoted", msg => {
    console.log(msg.body);
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
    flight.findByIdAndDelete(msg.body._id)
        .then(() => msg.ack())
        .catch(err => msg.nack());

    rabbot.publish("ex.1", {
        routingKey: "baggageStowed",
        type: "baggageStowed",
        body: {
            _id: msg.body._id
        }
    });
});

rabbot.handle("passengerChecked", msg => {
    console.log("passengerChecked");

    flight.findById({ _id: msg.body.Passenger.JoinedFlightID }, function (err, flight) {
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
    msg.ack();
});

module.exports = rabbot;