const { getSuccessResponse } = require('../utils/success');
const { getErrorResponse } = require('../utils/error');
const connectToDatabase = require('../utils/db');
const ProductModel = require('../models/Product');
const { logger } = require('../utils/logger');

module.exports.main = async (event) => {
    try {
        let result;
        const { pageNumber } = event.queryStringParameters;
        const pageSize = 12; // default
        const page = Number(pageNumber) || 1; // default 1

        const dbConnected = await connectToDatabase();
        if (dbConnected) {
            const ProductInstance = await ProductModel(dbConnected);
            const countProduct = await ProductInstance.countDocuments({});
            const products = await ProductInstance.find({})
                .limit(pageSize)
                .skip(pageSize * (page - 1));

            result = { products, page, pages: Math.ceil(countProduct / pageSize) };
        }

        return getSuccessResponse(result);
    } catch (error) {
        logger.error('add to cart has error:', { error });
        return getErrorResponse(error);
    }
};
