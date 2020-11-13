const viewOrdersService = require('../services/viewOrders.service');
const { responseJson } = require('../helpers/buildResponse');
const StatusCodes = require('../config/statusCodes');
const logger = require('../config/winston');

exports.viewOrders = async (req, res) => {
    let response = {};
    try {
        const orders = await viewOrdersService.viewOrders(req.params, req.query);
        response = responseJson(StatusCodes.success.STATUS, StatusCodes.success.CODE, orders);
        return res.json(response);
    } catch(error) {
        logger.error(error.stack);
        response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, error.stack);
        return res.json(response);
    }
}