const rabbot = require("rabbot");
const Flight = require("../models/flight");

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
                name: "controlmanagement_queue",
                autoDelete: false,
                durable: true,
                subscribe: true
            }
        ],
        bindings: [
            {
                exchange: "ex.1",
                target: "controlmanagement_queue",
                keys: ["flightNoted", "statusChanged", "landingApproved", "takeoffApproved"]
            }
        ]
    })
    .then(() => {
        console.log("Rabbot succesfully connected.");
        rabbot.startSubscription("controlmanagement_queue");
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

rabbot.handle("statusChanged", msg => {
    console.log(msg.body);

    Flight.findById({_id: msg.body._id}, function(err, flight){
        flight.Status = msg.body.Status;
        flight.save();
        msg.ack();
    })
});

module.exports = rabbot;