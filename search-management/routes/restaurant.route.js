const express = require("express");
const logger = require("../config/winston");
const router = express.Router();
const restaurantCtrl = require('../controllers/restaurant.controller');

module.exports = (app) => {
    router.post('/restaurants', restaurantCtrl.validate('create'), restaurantCtrl.addRestaurant);
    router.get('/restaurants', restaurantCtrl.getRestaurants);
    router.get('/restaurants/:id', restaurantCtrl.getRestaurant);

    app.use('/api', router);
};