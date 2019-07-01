const rabbot = require("rabbot");
const Bill = require("../models/bill");

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
        keys: ["financialNoted", "billNoted"]
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

  rabbot.handle("spaceNoted", msg => {
    console.log(msg.body.Passenger);

    // Bill.create({
    //   Name: msg.body.Passenger.Name,
    //   Age: msg.body.Passenger.Age,
    //   JoinedFlightID: msg.body.Passenger.JoinedFlightID
    // }, function(err, passenger){
    //   if(!err){
    //     console.log("acknowled");
    //     msg.ack();
    //   } else{
    //     console.log(err);
    //     msg.nack();
    //   }
    // });
    msg.ack();
  });
  
module.exports = rabbot;