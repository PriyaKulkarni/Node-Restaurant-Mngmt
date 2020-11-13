'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    restaurantID: Schema.Types.ObjectId,
    restaurantName: String,
    orderTotalAmount: Number,
    city: String,
    food: [{
        dishName: String,
        quantity: Number,
        price: Number
    }],
    orderStatus: { type: String, default: 'Ordered' },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', orderSchema);