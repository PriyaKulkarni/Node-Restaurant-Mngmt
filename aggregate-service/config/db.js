const mongoose = require('mongoose');
require('dotenv').config();

mongoose
	.connect(process.env.Mongo_URL, { useNewUrlParser: true })
	.then(() => {
            console.log("Database connection established!");
	}).catch(err => {
            console.error("Error connecting Database instance due to: ", err);
            process.exit();
    });