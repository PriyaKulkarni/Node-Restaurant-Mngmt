const OrderModel = require('../models/orderModel');

exports.updateOrder = async (orderData) => {
    try {
        let order = new OrderModel(orderData);
        await order.save();
    } catch (error) {
        throw error;
    }
}