const mongoose = require('../config/database');

const planeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 1
    },
    CarryCapacity: {
        type: Number,
    },
    PassengerLimit: {
        type: Number
    } 
});

const Planes = mongoose.model('Planes', planeSchema);
module.exports = Planes; 