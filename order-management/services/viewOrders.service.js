const OrderModel = require('../models/orderModel');
const ObjectID = require('mongodb').ObjectID;

exports.viewOrders = async (params, query) => {
    try {
        const limit = (params && Number(params.limit)) || (query && Number(query.limit)) || 10;
        const skip = (params && Number(params.skip)) || (query && Number(query.skip)) || 0;
        await OrderModel.find().limit(limit).skip(skip);
    } catch(error) {
        throw error;
    }
}

exports.viewOrdersByRestaurantNames = async (data) => {
    try {
        if(!data.name) {
            const error = new Error("'name' in query string not provided");
            throw error;
        }
        const dataArr = data.name.split(',');
        console.log(dataArr);
        return await OrderModel.find({'restaurantName': {$in: dataArr}});
    } catch(error) {
        throw error;
    }
}

exports.viewOrdersByRestaurantIDs = async (data) => {
    try {
        if(!data.id) {
            const error = new Error("'id' in query string not provided");
            throw error;
        }
        let dataArr = data.id.split(',');
        console.log(dataArr);
        let restIDArr = dataArr.map(data => ObjectID(data));
        dataArr.forEach(element => {
            let el = new ObjectId(element);
            console.log(el);
            restIDArr.push(el);
        });
        console.log(restIDArr);
        return await OrderModel.find({'restaurantID': {$in: restIDArr}});
    } catch(error) {
        throw error;
    }
}
