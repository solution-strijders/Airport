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
        name: "financialmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "baggagemanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "bordermanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "checkinmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "controlmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "flightmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "groundmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "matrixmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      },
      {
        name: "spacemanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "baggagemanagement_queue",
        keys: ["baggageStowed"]
      },
      {
        exchange: "ex.1",
        target: "bordermanagement_queue",
        keys: ["passengerNoted"]
      },
      {
        exchange: "ex.1",
        target: "checkinmanagement_queue",
        keys: ["checkinNoted"]
      },
      {
        exchange: "ex.1",
        target: "controlmanagement_queue",
        keys: ["landingApproved", "departureApproved"]
      },
      {
        exchange: "ex.1",
        target: "flightmanagement_queue",
        keys: ["statusChanged"]
      },
      {
        exchange: "ex.1",
        target: "financialmanagement_queue",
        keys: ["billNoted"]
      },
      {
        exchange: "ex.1",
        target: "groundmanagement_queue",
        keys: ["fuelApproved"]
      },
      {
        exchange: "ex.1",
        target: "matrixmanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "spacemanagement_queue",
        keys: ["spaceNoted"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("baggagemanagement_queue");
    rabbot.startSubscription("bordermanagement_queue");
    rabbot.startSubscription("checkinmanagement_queue");
    rabbot.startSubscription("controlmanagement_queue");
    rabbot.startSubscription("flightmanagement_queue");
    rabbot.startSubscription("financialmanagement_queue");
    rabbot.startSubscription("groundmanagement_queue");
    rabbot.startSubscription("matrixmanagement_queue");
    rabbot.startSubscription("spacemanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbot.handle("baggageStowed", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("passengerNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("checkinNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("landingApproved", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("departureApproved", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("statusChanged", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("billNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("fuelApproved", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
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

module.exports = rabbot;