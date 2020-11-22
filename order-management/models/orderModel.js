'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    restaurantID: { type: Schema.Types.ObjectId },
    restaurantName: {
            type: String,
            required: true
        },
    orderTotalAmount: { type: Number },
    city: { type: String },
    food: [{
        dishName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number }
    }],
    orderStatus: { type: String, default: 'Ordered' },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', orderSchema);