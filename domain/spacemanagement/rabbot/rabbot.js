const rabbot = require("rabbot");
const space = require("../models/space").Space;

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
        name: "spacemanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "spacemanagement_queue",
        keys: ["spaceNoted"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("spacemanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

  rabbot.on( "unreachable", function() {
    rabbot.retry();
  } );

rabbot.handle("spaceNoted", msg => {
  console.log("I SEE SPACE" + msg);
  new space(msg)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

module.exports = rabbot;