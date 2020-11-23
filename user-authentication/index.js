const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');

const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// db instance connection
require("./config/db");

require("./services/auth.service");

//Auth routes
const routes = require('./routes/auth.route');
const secureRoute = require('./routes/user.route');

const app = express();

const port = process.env.PORT || 9000;

// Logging
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false, }), secureRoute);

// Proxy Middleware
app.use('/api/placeOrder',
    passport.authenticate('jwt', { session: false, }),
    createProxyMiddleware(
        {
            target: process.env.ORDER_SERVICE_URL,
            changeOrigin: true
        })
);
app.use('/api/getOrders', 
    passport.authenticate('jwt', { session: false, }),
    createProxyMiddleware(
        {
            target: process.env.ORDER_SERVICE_URL,
            changeOrigin: true
        })
);
app.use('/api/addRestaurant', 
    passport.authenticate('jwt', { session: false, }),
    createProxyMiddleware(
        {
            target: process.env.SEARCH_SERVICE_URL,
            changeOrigin: true
        })
);
app.use('/api/restaurants',
    createProxyMiddleware(
        {
            target: process.env.SEARCH_SERVICE_URL,
            changeOrigin: true
        })
);

// Handle errors.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
});

module.exports = app;