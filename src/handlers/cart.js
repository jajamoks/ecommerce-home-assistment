const { getSuccessResponse } = require('../utils/success');
const { getErrorResponse } = require('../utils/error');
const connectToDatabase = require('../utils/db');
const CartModel = require('../models/Cart');
const { logger } = require('../utils/logger');

module.exports.main = async (event) => {

    try {
        const { user, cartItems, currency } = JSON.parse(event.body);
        let result;
        const dbConnected = await connectToDatabase();
        if (dbConnected) {
            const CartInstance = await CartModel(dbConnected);
            const cartDoc = new CartInstance({
                currency,
                user,
                cartItems,
            });
            result = await cartDoc.save();
        }

        return getSuccessResponse(result);
    } catch (error) {
        logger.error('add to cart has error:', { error });
        return getErrorResponse(error);
    }
};
