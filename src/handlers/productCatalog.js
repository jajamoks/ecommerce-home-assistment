import Product from "../services/mongoDb/model/Product";
import connectDB from "../services/mongoDb/connection";
import { logger } from "../utils/logger";
import corsMiddleware from "../middleware/cors";

/**
 * Product Catalog Service: This service list all products from database.
 */
async function productCatalog(event) {

  let message;
  let statusCode = 200;

  try {
    connectDB();
    const { pageNumber } = event["queryStringParameters"];
    const pageSize = 12; // default
    const page = Number(pageNumber) || 1; // default 1

    const countProduct = await Product.countDocuments({});
    const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    statusCode = 200;
    message = { products, page, pages: Math.ceil(countProduct / pageSize) };

  } catch (err) {
    logger.error('getProducts thrown an error', err);
    statusCode = 500;
    message = err;
  }

  return {
    statusCode,
    body: JSON.stringify(message)
  };

}

export const handler = corsMiddleware(productCatalog);

