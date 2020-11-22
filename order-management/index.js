const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const logger = require('winston');

// db instance connection
require("./config/db");

const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined', { stream: logger.stream.write }));

//API routes
require("./routes/order.route")(app);

app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send('Something broke!')
    next(err);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
});

module.exports = app;