const RestaurantModel = require('../models/restaurant.model');

exports.search = async (query, params) => {
    try {
        if (query.cuisine) {
            var cuisineData = req.query.cuisine.split(',')
        }
        if (query.menu) {
            var menuData = req.query.menu.split(',')
        }
        const searchQuery = {
            $or : [
                { 'restaurantName': query.restaurantName },
                { 'userRating': query.userRating },
                { 'budget': query.budget },
                { 'location': query.location },
                { 'cuisine': { $in : cuisineData } },
                { 'menu.dishName' : { $in : menuData } }
            ]
        }

        const limit = (params && Number(params.limit)) || (query && Number(query.limit)) || 10;
        const skip = (params && Number(params.skip)) || (query && Number(query.skip)) || 0;

        return await RestaurantModel.find(searchQuery).limit(limit).skip(skip);
    } catch (error) {
        throw error;
    }
}