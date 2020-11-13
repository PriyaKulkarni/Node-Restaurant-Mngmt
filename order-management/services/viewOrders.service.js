const OrderModel = require('../models/orderModel');

exports.viewOrders = async (params, query) => {
    try {
        const limit = (params && Number(params.limit)) || (query && Number(query.limit)) || 10;
        const skip = (params && Number(params.skip)) || (query && Number(query.skip)) || 0;
        await OrderModel.find().limit(limit).skip(skip);
    } catch(error) {
        throw error;
    }
}