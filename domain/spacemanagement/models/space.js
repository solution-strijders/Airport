const mongoose = require('../config/database');

const spaceSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    StartDate: {
        type: Date
    },
    EndDate: {
        type: Date
    },
    SpaceType: {
        type: String
    }
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space; 