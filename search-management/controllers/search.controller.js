const searchService = require('../services/search.service');
const { check, validationResult, oneOf } = require('express-validator');
const { responseJson } = require('../helpers/buildResponse');
const StatusCodes = require('../config/statusCodes');
const logger = require('../../order-management/config/winston');

exports.validate = (search) => {
    return oneOf([
        check('restaurantName').exists(),
        check('userRating').exists(),
        check('budget').exists(),
        check('location').exists(),
        check('cuisine').exists(),
        check('menu').exists()
    ]);
};

exports.search = async (req, res) => {
    let response = {};
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array());
            response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, errors.array());
            return res.json(response);
        }
        const restaurants = await searchService.search(req.query, req.params);
        if(restaurants.length > 0) {
            response = responseJson(StatusCodes.success.STATUS, StatusCodes.success.CODE, restaurants); 
        } else {
            response = responseJson(StatusCodes.notFound.STATUS, StatusCodes.notFound.CODE, "Empty List");
        }
        return res.json(response);
    } catch (error) {
        logger.error(error.stack);
        response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, error.stack);
        return res.json(response);
    }
}

