const express = require("express");
const router = express.Router();
const createOrderCtrl = require('../controllers/createOrder.controller');
const viewOrdersCtrl = require('../controllers/viewOrders.controller');
const updateOrderCtrl = require('../controllers/updateOrder.controller');

module.exports = (app) => {
    router.post('/orders', createOrderCtrl.validate('create'), createOrderCtrl.createOrder);
    // router.get('/orders', viewOrdersCtrl.viewOrders);
    // router.put('/order/:orderID', updateOrderCtrl.validate('update'), updateOrderCtrl.updateOrder);

    app.use('/api', router);
};