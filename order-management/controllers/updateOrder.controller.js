const updateOrderService = require('../services/updateOrder.service');
const { check, validationResult } = require('express-validator');
const { responseJson } = require('../helpers/buildResponse');
const StatusCodes = require('../config/statusCodes');
const logger = require('../config/winston');

exports.validate = (update) => {
    return [
        // check('orderTotalAmount').exists().isNumeric(),
        check('orderID').exists().isMongoId(),
        check('dishName').exists().isString(),
        check('quantity').exists().isNumeric()
    ]
}

exports.updateOrder = async (req, res) => {
    let response = {};
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array());
            response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, errors.array());
            return res.json(response);
        }
        if (mongoose.Types.ObjectId.isValid(req.params.orderID)) {
            const UpdateFoodData = await Order.findByIdAndUpdate({ _id: req.params.orderID, 'food._id': req.body.foodID },
                {
                    $set: {
                        orderTotalAmount: req.body.orderTotalAmount,
                        food: {
                            dishName: req.body.dishName,
                            quantity: req.body.quantity
                        }
                    },
                }, {
                    new: true
                })
        }
        //const savedOrder = await updateOrderService.updateOrder(req.body);
        response = responseJson(StatusCodes.success.STATUS, StatusCodes.success.CODE, savedOrder);
        return res.json(response);
    } catch (error) {
        logger.error(error.stack);
        response = responseJson(StatusCodes.error.STATUS, StatusCodes.error.CODE, error.stack);
        return res.json(response);
    }
}