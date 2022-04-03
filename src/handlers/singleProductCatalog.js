import Product from "../services/mongoDb/model/Product";
import connectDB from "../services/mongoDb/connection";
import { logger } from "../utils/logger";
import corsMiddleware from "../middleware/cors";

/**
 * Single Product Catalog Service: This service list all products from database.
 */
async function singleProductCatalog(event) {

    let message;
    let statusCode = 200;

    try {
        connectDB();
        const { id } = event.pathParameters;
        const product = await Product.findById(id);

        if (product) {
            message = product;
        } else {
            statusCode = 404;
            message = "Product not found";
        }

    } catch (err) {
        message = err;
        statusCode = 500;
        logger.error('getProduct thrown an error', err);
    }

    return {
        statusCode,
        body: JSON.stringify(message)
    };

}

export const handler = corsMiddleware(singleProductCatalog);

