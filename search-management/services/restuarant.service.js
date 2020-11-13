const RestaurantModel = require('../models/restaurant.model');

exports.addRestaurant = async (restaurantData) => {
    try {
        let restaurant = new RestaurantModel(restaurantData);
        await restaurant.save();
    } catch (error) {
        throw error;
    }
}

exports.getRestaurants = async (params, query) => {
    try {
        const limit = (params && Number(params.limit)) || (query && Number(query.limit)) || 10;
        const skip = (params && Number(params.skip)) || (query && Number(query.skip)) || 0;
        return await RestaurantModel.find().limit(limit).skip(skip);
    } catch (error) {
        throw error;
    }
}

exports.getRestaurant = async (id) => {
    try {
        return await RestaurantModel.findById(id);
    } catch (error) {
        throw error;
    }
}

