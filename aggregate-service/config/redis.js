const redis = require('redis');
require('dotenv').config();

// const client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)

client.auth(process.env.REDIS_DB_PASS, function (err) {
    if(err) console.log('Error ' + err);
});

client.on('error', function (err) {
    console.log('Error ' + err);
}); 

client.on('connect', function() {
    console.log('Connected to Redis');
});

module.exports = client;