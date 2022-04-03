import Cart from "../services/mongoDb/model/Cart";
import { logger } from "../utils/logger";
import connectDB from "../services/mongoDb/connection";
import corsMiddleware from "../middleware/cors";

/**
 * Cart Service: This service receive an cart event and save to database.
 */
async function cart(event) {
    let statusCode = 200;
    let message;

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "No body was found",
            }),
        };
    }

    try {
        connectDB();
        const { user, cartItems, currency } = JSON.parse(event.body);

        const cart = new Cart({
            currency,
            user,
            cartItems,
        });

        // validate cart schema for errors
        const error = cart.validateSync();
        if (error) {
            logger.error('Add to cart has an error', {
                error
            });
            throw new Error(error);
        }
        // save cart to mongodb
        message = await cart.save();
    } catch (error) {
        console.log(error);
        message = error;
        statusCode = 500;
    }

    return {
        statusCode,
        body: JSON.stringify({
            message,
        }),
    };
};

export const handler = corsMiddleware(cart);