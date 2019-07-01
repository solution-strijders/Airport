const mongoose = require('../config/database');

const eventSchema = new mongoose.Schema({
    Type: {
        type: String
    },
    Queue: {
        type: String
    },
    Body: {
        type: String
    }
});

const Events = mongoose.model('Events', eventSchema);
module.exports = Events; 