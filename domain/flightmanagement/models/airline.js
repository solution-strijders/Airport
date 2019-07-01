const mongoose = require('../config/database');

const planeSchema = require('./plane').schema;

const airlineSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 1
    },
    Fleet: {
        type: [planeSchema]
    }
});

const Airlines = mongoose.model('Airlines', airlineSchema);

module.exports = Airlines; 