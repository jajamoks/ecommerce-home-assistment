const { getSuccessResponse } = require('../utils/success');
const { getErrorResponse } = require('../utils/error');
const { SQS } = require('aws-sdk');
const connectToDatabase = require('../utils/db');
const OrderModel = require('../models/Order');
const { logger } = require('../utils/logger');

const sqs = new SQS();

module.exports.main = async (event) => {

    try {
        const { user, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, currency, } = JSON.parse(event.body);
        let result;
        const dbConnected = await connectToDatabase();
        if (dbConnected) {
            const OrderInstance = await OrderModel(dbConnected);
            const orderDoc = new OrderInstance({
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
            result = await orderDoc.save();

            // push cart object to sqs
            await sqs
                .sendMessage({
                    QueueUrl: process.env.ORDER_STATUS_QUEUE_URL,
                    MessageBody: JSON.stringify(result),
                    MessageAttributes: {
                        AttributeName: {
                            StringValue: "Attribute Value",
                            DataType: "String",
                        },
                    },
                })
                .promise();

        }

        return getSuccessResponse(result);
    } catch (error) {
        logger.error('add to cart has error:', { error });
        return getErrorResponse(error);
    }
};
