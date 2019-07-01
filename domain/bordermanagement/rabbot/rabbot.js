const rabbot = require("rabbot");
const Passenger = require("../models/passenger");

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
        name: "bordermanagement_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "bordermanagement_queue",
        keys: ["passengerNoted", "checkinNoted"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbot.startSubscription("bordermanagement_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

  rabbot.on( "unreachable", function() {
    rabbot.retry();
  } );

  rabbot.handle("checkinNoted", msg => {
    console.log(msg.body.Passenger);

    Passenger.create({
      Name: msg.body.Passenger.Name,
      Age: msg.body.Passenger.Age,
      JoinedFlightID: msg.body.Passenger.JoinedFlightID
    }, function(err, passenger){
      if(!err){
        console.log("acknowled");
        msg.ack();
      } else{
        console.log(err);
        msg.nack();
      }
    });
  });
  
module.exports = rabbot;