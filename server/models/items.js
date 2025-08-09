const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    category: { 
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
