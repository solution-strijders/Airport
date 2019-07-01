const rabbot = require("rabbot");
const Event = require("../models/event");
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
        name: "securitymanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "securitymanagement_queue",
        keys: ["baggageStowed", 
        "passengerChecked", 
        "checkinNoted", 
        "landingApproved", 
        "departureApproved", 
        "statusChanged", 
        "billNoted", 
        "fuelApproved", 
        "spaceNoted",
        "flightNoted"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("securitymanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbot.handle("baggageStowed", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("passengerChecked", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("checkinNoted", msg => {
  console.log("msg")
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("landingApproved", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("departureApproved", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("statusChanged", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("billNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("fuelApproved", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("spaceNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

rabbot.handle("flightNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  }).save()
  .then(() => msg.ack())
  .catch(() => msg.nack());
});

module.exports = rabbot;