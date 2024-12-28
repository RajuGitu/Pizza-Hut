const mongoose = require('mongoose');

// Define Pizza Schema
const pizzaSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    calories: {
        type: String,
        required: true
    },
    menu:{
        type:String
    },
    prices: {
        type: Map, // Use Map for dynamic key-value pairs
        of: Number, // Values must be numbers
        required: true,
    }
});

// Create Model
module.exports = mongoose.model('Pizza', pizzaSchema);


