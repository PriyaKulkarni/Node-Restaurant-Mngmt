const fetch = require('node-fetch');
const client = require('../config/redis');
const amqp = require('amqplib');
require('dotenv').config();
messageConsumer();

exports.getRestaurantsByCity = async (req, res) => {
    try {
        client.get(`RestaurantsByCity${req.query.location}`, async (err, reply) => {
            if(err) {
                throw err;
            }
            if(!reply) {
                try {
                    const restByCityResponse = await fetch(`${process.env.SEARCH_SERVICE}/api/search?location=${req.query.location}`);
                    const restaurantsByCity = await restByCityResponse.json();
                    if(!Array.isArray(restaurantsByCity.data)) {
                        return res.json(restaurantsByCity);
                    }
                    client.set(`RestaurantsByCity${req.query.location}`, JSON.stringify(restaurantsByCity));
                    return res.json(restaurantsByCity);
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

async function messageConsumer() {
    const q = 'Add-Restaurant';
    const connection = await amqp.connect(process.env.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    channel.assertQueue(q);
    channel.consume(q, msg => {
        if (msg !== null) {
            // console.log(`RestaurantsByCity`+msg.content);
            client.del(`RestaurantsByCity`+msg.content, (err, resp)=> console.log(resp));
        }
    });
}