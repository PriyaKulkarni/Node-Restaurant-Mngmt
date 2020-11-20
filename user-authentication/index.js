const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');

// db instance connection
require("./config/db");

require("./services/auth.service");

//Auth routes
const routes = require('./routes/auth.route');
const secureRoute = require('./routes/user.route');

const app = express();

const port = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/', routes);

/**
 * middleware for checking authorization with jwt
 */
// function authorized(request, response, next) {
//     passport.authenticate('jwt', { session: false, }, async (error, token) => {
//         console.log("req"+ request.body);
//         console.log('authorise', error, token);
//         if (error || !token) {
//             response.status(401).json({ message: 'Unauthorized' });
//         } 
//         // try {
//         //     const user = await User.findOne({
//         //         where: { id: token.id },
//         //     });
//         //     request.user = user;
//         // } catch (error) {
//         //     next(error);
//         // }
//         request.user = token.user;
//         next();
//     })(request, response, next);   
// }

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false, }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
});

module.exports = app;