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
        target: "financialmanagement_queue",
        keys: ["baggageNoted", "flightNoted"]
      },
      {
        exchange: "ex.1",
        target: "baggagemanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "bordermanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "checkinmanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "controlmanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "flightmanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "groundmanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "matrixmanagement_queue",
        keys: [""]
      },
      {
        exchange: "ex.1",
        target: "spacemanagement_queue",
        keys: [""]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("financialmanagement_queue");
    rabbot.startSubscription("baggagemanagement_queue");
    rabbot.startSubscription("bordermanagement_queue");
    rabbot.startSubscription("checkinmanagement_queue");
    rabbot.startSubscription("controlmanagement_queue");
    rabbot.startSubscription("flightmanagement_queue");
    rabbot.startSubscription("groundmanagement_queue");
    rabbot.startSubscription("matrixmanagement_queue");
    rabbot.startSubscription("spacemanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbot.handle("baggageNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});

rabbot.handle("flightNoted", msg => {
  new Event({
    Type: msg.type,
    Queue: msg.queue,
    Body: JSON.stringify(msg.body)
  })
});




module.exports = rabbot;