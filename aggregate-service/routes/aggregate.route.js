const express = require('express');
const router = express.Router();

const getOrdersByRatingCtrl = require('../controllers/getOrdersByRating.controller');
const getRestaurantsByCityCtrl = require('../controllers/getRestaurantsByCity.controller');

router.get('/getRestaurantOrdersWithRating',getOrdersByRatingCtrl.getRestarantOrdersByRating);
router.get('/getRestaurantsByCity', getRestaurantsByCityCtrl.getRestaurantsByCity);

module.exports = router;