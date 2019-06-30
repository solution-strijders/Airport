const rabbot = require("rabbot");
const checkin = require("../models/checkin");
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
    queues: [{
        name: "checkinmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
    }],
    bindings: [{
        exchange: "ex.1",
        target: "checkinmanagement_queue",
        keys: ["checkinNoted"]
    }]
}).then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("checkinmanagement_queue");
    console.log("Rabbot subscribed.");
}).catch(error => console.log("Rabbot connect error: " + error));

rabbot.handle("checkinNoted", msg => {
    new checkin(msg)
    .save()
    .then(() => msg.ack())
.catch(err => msg.nack());
});

module.exports = rabbot; 