const { getSuccessResponse } = require('../utils/success');
const { getErrorResponse } = require('../utils/error');
const connectToDatabase = require('../utils/db');
const ProductModel = require('../models/Product');
const { logger } = require('../utils/logger');


module.exports.main = async (event) => {
    try {
        let result;
        const { id } = event.pathParameters;
        const dbConnected = await connectToDatabase();
        if (dbConnected) {
            const ProductInstance = await ProductModel(dbConnected);
            result = await ProductInstance.findOne({ _id: id });
        }
        return getSuccessResponse(result);
    } catch (error) {
        logger.error('add to cart has error:', { error });
        return getErrorResponse(error);
    }
};
