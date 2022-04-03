const productCatalog = require('../handlers/productCatalog');

describe('Unit test for productCatalog', () => {
    it('successful response', async () => {
        const event = {
            queryStringParameters: {
                pageNumber: '1',
            },
        };

        const result = await productCatalog.main(event);
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toMatchObject({
            message: 'Executed Successfully',
            success: true,
        });
    });
});
