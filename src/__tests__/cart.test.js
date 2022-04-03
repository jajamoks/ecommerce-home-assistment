const cart = require('../handlers/cart');
describe('Unit test for create cart', () => {
    it('successful response', async () => {
        const event = { "body": "{\n    \"user\": \"Aldrin\",\n    \"cartItems\": {\n            \"name\": \"Mens Cotton Jacket\",\n            \"image\": \"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg\",\n            \"price\": 99.9,\n            \"qty\": 2,\n            \"product\": \"6247c29663001bf1fdd35fc3\" \n    }\n}" };

        const result = await cart.main(event);
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toMatchObject({
            message: 'Executed Successfully',
            success: true,
        });
    });
});
