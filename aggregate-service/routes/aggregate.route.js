const express = require('express');
const router = express.Router();

const getOrdersByRatingCtrl = require('../controllers/getOrdersByRating.controller');

router.get('/getRestaurantOrdersWithRating',getOrdersByRatingCtrl.getRestarantOrdersByRating);

module.exports = router;