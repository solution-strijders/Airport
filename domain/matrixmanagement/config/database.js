const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0
};
const reconnectTimeout = 100;

mongoose.connect(process.env.DB_HOST, options, error => {
  if (error) {
    console.log("Error connecting to ", process.env.DB_HOST, error);
  } else {
    console.log("Succesfully connected to ", process.env.DB_HOST);
  }
});

module.exports = mongoose;