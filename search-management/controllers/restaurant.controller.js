const restaurantService = require('../services/restuarant.service');
const { check, validationResult } = require('express-validator');
const { responseJson } = require('../helpers/buildResponse');
const StatusCodes = require('../config/statusCodes');
const logger = require('../../order-management/config/winston');

require('dotenv').config();
const amqp = require('amqplib');

exports.validate = (create) => {
    return [
        check('restaurantName').exists(),
        check('userRating').exists(),
        check('budget').exists(),
        check('location').exists(),
        check('cuisine').exists(),
        check('menu').exists()
    ];
};

exports.addRestaurant = async (req, res) => {
    let response = {};
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array());
            response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, errors.array());
            return res.json(response);
        }
        const savedRestaurant = await restaurantService.addRestaurant(req.body);
        messagePublisher(req.body.location);
        response = responseJson(StatusCodes.success.STATUS, StatusCodes.success.CODE, savedRestaurant);
        return res.json(response);
    } catch (error) {
        logger.error(error.stack);
        response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, error.stack);
        return res.json(response);
    }
};

exports.getRestaurants = async (req, res) => {
    let response = {};
    try {
        const restaurants = await restaurantService.getRestaurants(req.params, req.query);
        response = responseJson(StatusCodes.success.STATUS, StatusCodes.success.CODE, restaurants);
        return res.json(response);
    } catch (error) {
        logger.error(error.stack);
        response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, error.stack);
        return res.json(response);
    }
};

exports.getRestaurant = async (req, res) => {
    let response = {};
    try {
        const restaurant = await restaurantService.getRestaurant(req.params.id);
        if(!restaurant) {
            response = responseJson(StatusCodes.notFound.STATUS, StatusCodes.notFound.CODE, "Empty List");
            return res.json(response);
        }
        response = responseJson(StatusCodes.success.STATUS, StatusCodes.success.CODE, restaurant);
        return res.json(response);
    } catch (error) {
        logger.error(error.stack);
        response = responseJson(StatusCodes.error.STATUS, statusCodes.error.CODE, error.stack);
        return res.json(response);
    }
};

async function messagePublisher(city) {
    const q = 'Add-Restaurant';
    const connection = await amqp.connect(process.env.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    channel.assertQueue(q);
    channel.sendToQueue(q, Buffer.from(city));
}