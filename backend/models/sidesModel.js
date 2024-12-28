const mongoose = require('mongoose');

const sidesSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    tittle: {
        type: String,
        required: true
    },
    calories: {
        type: String
    },
    description: {
        type: String
    },
    menu: {
        type: String
    },
    prices: {
        type: Number
    }
});

module.exports = mongoose.model('sides', sidesSchema);
