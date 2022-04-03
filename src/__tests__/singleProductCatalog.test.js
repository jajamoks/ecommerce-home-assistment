const singleProductCatalog = require('../handlers/singleProductCatalog');

describe('Unit test for singleProductCatalog', () => {
    it('successful response', async () => {
        const event = {
            pathParameters: {
                id: '6247c29663001bf1fdd35fc3',
            },
        };

        const result = await singleProductCatalog.main(event);
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toMatchObject({
            message: 'Executed Successfully',
            success: true,
        });
    });
});