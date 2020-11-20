const express = require('express');
const app = express();
const mongoose = require('mongoose');

// db instance connection
require("./config/db");

const port = process.env.PORT || 7000;

const routes = require('./routes/aggregate.route');
app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

app.listen(port, () => {
console.log(`The server is running at http://localhost:${port}/`);
});
