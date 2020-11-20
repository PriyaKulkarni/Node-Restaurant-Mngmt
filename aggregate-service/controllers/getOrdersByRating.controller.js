const fetch = require('node-fetch');
const client = require('../config/redis');
require('dotenv').config();

exports.getRestarantOrdersByRating = async (req, res) => {
    try {
        client.get(`RestarantOrdersByRating${req.query.rating}`, async (err, reply) => {
            // console.log("Error/reply", err,reply);
            if(err) {
                throw err;
            }
            if(!reply) {
                try {
                    const restRatingResponse = await fetch(`${process.env.SEARCH_SERVICE}/api/search?userRating=${req.query.rating}`);
                    const restaurantsRating = await restRatingResponse.json();
                    if(!Array.isArray(restaurantsRating.data)) {
                        return res.json(restaurantsRating);
                    }
                    let restaurant_names = []
                    restaurantsRating.data
                        .forEach(restaurant => restaurant_names.push(restaurant.restaurantName));

                    const orderResponse = await fetch(`${process.env.ORDER_SERVICE}/api/getOrdersByRNames?name=${restaurant_names}`);
                    const orders = await orderResponse.json();
                    // console.log(orders);
                    client.set(`RestarantOrdersByRating${req.query.rating}`, JSON.stringify(orders));
                    return res.json(orders);
                } catch(err) {
                    return res.json({status: 500, error: err.stack});
                }
            }
            return res.json({ source: 'cache', data: JSON.parse(reply) })
        });
        
    } catch(err) {
        return res.json({status: 500, error: err.stack});
    }
};
