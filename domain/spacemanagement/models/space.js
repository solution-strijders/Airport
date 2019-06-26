const mongoose = require('../config/database');

const spaceSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    SpaceType: {
        type: String
    }
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space; 