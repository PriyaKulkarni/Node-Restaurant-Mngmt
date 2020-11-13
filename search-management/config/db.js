const mongoose = require('mongoose');
const logger = require('./winston');
require('dotenv').config();

mongoose
	.connect(process.env.Mongo_URL, { useNewUrlParser: true })
	.then(() => {
                logger.info("Database connection established!");
	}).catch(err => {
                logger.error("Error connecting Database instance due to: ", err);
                process.exit();
        });