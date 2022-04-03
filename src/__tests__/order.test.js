const order = require('../handlers/order');
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
    const SQSMocked = {
        sendMessage: jest.fn().mockReturnThis(),
        promise: jest.fn()
    };
    return {
        SQS: jest.fn(() => SQSMocked)
    };
});

const sqs = new AWS.SQS({
    region: 'us-east-1'
});

describe('Unit test for create order', () => {
    beforeEach(() => {
        (sqs.sendMessage().promise).mockReset();
    });

    it('successful response', async () => {
        const event = { "body": "{\n   \"user\":\"John Doe\",\n   \"orderItems\":[\n      {\n         \"name\":\"Opna Women's Short Sleeve Moisture\",\n         \"image\":\"https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg\",\n         \"price\":7.95,\n         \"qty\":1,\n         \"product\":\"6248072b2d3f6f0438019843\"\n      }\n   ],\n   \"shippingAddress\":{\n      \"address\":\"ddd\",\n      \"city\":\"Cebu\",\n      \"postalCode\":\"11111\",\n      \"country\":\"mx\"\n   },\n   \"paymentMethod\":\"card\",\n   \"currency\":\"USD\",\n   \"taxPrice\":12,\n   \"shippingPrice\":70,\n   \"totalPrice\":100,\n   \"isPaid\":true,\n   \"isDelivered\":false\n}" };

        const result = await order.main(event);
        expect(jest.isMockFunction(sqs.sendMessage)).toBeTruthy();
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toMatchObject({
            message: 'Executed Successfully',
            success: true,
        });
    });
});
