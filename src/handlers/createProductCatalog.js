import Product from "../services/mongoDb/model/Product";
import connectDB from "../services/mongoDb/connection";
import { logger } from "../utils/logger";
import createError from "http-errors";

async function createProductCatalog(event) {

    connectDB();

    const { name, summary, description, price, image, productType, brand, category, countInStock } = JSON.parse(event.body);

    const product = new Product({
        name,
        summary,
        description,
        image,
        price,
        productType,
        brand,
        countInStock,
        category,
    });

    let productCreated;
    try {
        const error = product.validateSync();

        if (error) {
            logger.error('Product create has error:', {
                error
            });
            throw new createError.UnprocessableEntity(error);
        }
        productCreated = await product.save();

        return {
            statusCode: 201,
            body: JSON.stringify(productCreated),
        };

    } catch (error) {
        logger.error('Product save has error', { error });
        return {
            statusCode: error.statusCode,
            body: JSON.stringify(error.message),
        };
    }

}
export const handler = createProductCatalog;
