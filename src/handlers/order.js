import { SQS } from "aws-sdk";
import Order from "../services/mongoDb/model/Order";
import { logger } from "../utils/logger";
import connectDB from "../services/mongoDb/connection";
import corsMiddleware from "../middleware/cors";
const sqs = new SQS();

/**
 * Order Service: This service receive an order object and save to database.
 * After save to mongodb it will send an order payload to sqs.
 */
async function order(event) {
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
        const { user, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, currency, } = JSON.parse(event.body);

        const order = new Order({
            orderItems,
            user,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            currency,
        });
        // validate cart schema for errors
        const error = order.validateSync();
        if (error) {
            logger.error('Add to cart has an error', {
                error
            });
            throw new Error(error);
        }
        // save cart to mongodb
        message = await order.save();

        // push cart object to sqs
        await sqs
            .sendMessage({
                QueueUrl: process.env.ORDER_STATUS_QUEUE_URL,
                MessageBody: JSON.stringify(message),
                MessageAttributes: {
                    AttributeName: {
                        StringValue: "Attribute Value",
                        DataType: "String",
                    },
                },
            })
            .promise();

    } catch (error) {
        logger.error(error);
        message = error;
        statusCode = 500;
    }

    return {
        statusCode,
        body: JSON.stringify(message),
    };
};

export const handler = corsMiddleware(order);