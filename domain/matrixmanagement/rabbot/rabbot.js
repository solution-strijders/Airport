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
        name: "matrixmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "matrixmanagement_queue",
        keys: ["flightNoted", "statusChanged"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("matrixmanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

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
    flight.findById({_id: msg.body._id}, function(err, flight){

      if(msg.body.status == "Departed"){
        flight.remove();
      } else{
        flight.Status = msg.body.status;
        flight.save();
        msg.ack();
      }
    })
  });

module.exports = rabbot;