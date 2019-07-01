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
    new Flight(msg)
        .save()
        .then(() => msg.ack())
        .catch(err => msg.nack());
});

rabbot.handle("statusChanged", msg => {
    const objectProps = {
        Status: msg.body.Status,
    };

    Flight.findByIdAndUpdate(msg.body._id, objectProps, { new: true })
        .then(() => msg.ack())
        .catch(err => msg.nack());
});

module.exports = rabbot;