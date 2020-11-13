const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const logger = require('winston');

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined', { stream: logger.stream.write }));

//API routes
require("./routes/order.route")(app);

// app.use(function(err, req, res, next) {
//     logger.error(`${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`);
//     next(err);
// });

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
});

module.exports = app;