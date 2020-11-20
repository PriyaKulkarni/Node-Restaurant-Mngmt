const express = require("express");
const router = express.Router();
const createOrderCtrl = require('../controllers/createOrder.controller');
const viewOrdersCtrl = require('../controllers/viewOrders.controller');
const updateOrderCtrl = require('../controllers/updateOrder.controller');

module.exports = (app) => {
    //TODO: add Joi validation
    router.post('/placeOrder', createOrderCtrl.validate('create'), createOrderCtrl.createOrder);
    router.get('/getOrders', viewOrdersCtrl.viewOrders);
    router.get('/getOrdersByRID', viewOrdersCtrl.viewOrdersByRestaurantIDs);
    router.get('/getOrdersByRNames', viewOrdersCtrl.viewOrdersByRestaurantNames);
    // router.put('/order/:orderID', updateOrderCtrl.validate('update'), updateOrderCtrl.updateOrder);

    app.use('/api', router);
};