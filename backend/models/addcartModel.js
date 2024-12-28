const mongoose = require('mongoose');

const addcartSchema = new mongoose.Schema({
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
    menu: {
        type: String
    },
    prices: {
        type: Number
    },
    count: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model('addcart', addcartSchema);