'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    restaurantName: String,
    userRating: Number,
    budget: Number,
    location: String,
    cuisine: [String],
    menu: [{ dishName: String, price: Number }]
});

module.exports = mongoose.model('restaurant', restaurantSchema);