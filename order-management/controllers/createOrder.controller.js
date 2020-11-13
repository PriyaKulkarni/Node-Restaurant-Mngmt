const createOrderService = require('../services/createOrder.service');
const { check, validationResult } = require('express-validator');
const { responseJson } = require('../helpers/buildResponse');
const StatusCodes = require('../config/statusCodes');
const logger = require('../config/winston');

exports.validate = (create) => {
    return [
        check('restaurantName').exists(),
        check('food').exists().isArray(),
        check('food.*.dishName').exists(),
        check('food.*.quantity').exists()
    ];
}

exports.createOrder = async (req, res) => {
    let response = {};
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array());
            response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, errors.array());
            return res.json(response);
        }
        const createOrderResponse = await createOrderService.createOrder(req.body);
        if(createOrderResponse && createOrderResponse.code === StatusCodes.notFound.CODE) {
            createOrderResponse.data = req.body.restaurantName + " does not exist";
            return res.json(createOrderResponse);
        }
        response = responseJson(StatusCodes.success.STATUS, StatusCodes.success.CODE, createOrderResponse);
        return res.json(response);
    } catch (error) {
        logger.error(error.stack);
        response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, error.stack);
        return res.json(response);
    }
}