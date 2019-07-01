const rabbot = require("rabbot");
const bagage = require("../models/bagage");
const flight = require('../models/flight');
const passenger = require('../models/passenger');
const plane = require('../models/plane');
const user = require('../models/users');
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
        keys: ["passengerNoted", "flightNoted", "planeNoted"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("flightmanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));


rabbot.handle("flightNoted", msg => {
    new flight(msg)
      .save()
      .then(() => msg.ack())
      .catch(err => msg.nack());
  });

  rabbot.handle("passengerNoted", msg => {
    new passenger(msg)
      .save()
      .then(() => msg.ack())
      .catch(err => msg.nack());
  });
  
  rabbot.handle("planeNoted", msg => {
    new plane(msg)
      .save()
      .then(() => msg.ack())
      .catch(err => msg.nack());
  });

module.exports = rabbot;