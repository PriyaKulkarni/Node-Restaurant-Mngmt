const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const logger = require('winston');

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined', { stream: logger.stream.write }));

//API routes
require("./routes/restaurant.route")(app);
require("./routes/search.route")(app);

// app.use((err, req, res, next) => {
//     logger.error(err.stack);
//     res.status(500).send('Something broke!')
// });

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
});

module.exports = app;