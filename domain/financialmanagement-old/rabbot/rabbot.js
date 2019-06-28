const rabbot = require("rabbot");
const Bill = require("../models/bill");
const FinanceDept = require("../models/FinanceDepartment");

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
        name: "financialmanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "financialmanagement_queue",
        keys: ["billNoted", "departmentCreated"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("financialmanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

  rabbot.on( "unreachable", function() {
    rabbot.retry();
  } );

rabbot.handle("billNoted", msg => {
  console.log("ALL THESE BILLS" + msg);
  new bill(msg)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

rabbot.handle("departmentCreated", msg => {
  console.log("ALL THESE DEPARTMENTS" + msg);
  new FinanceDept(msg)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

rabbot.handle("spaceNoted", msg => {
  console.log("I SEE SPACE" + msg);
  new space(msg)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

module.exports = rabbot;