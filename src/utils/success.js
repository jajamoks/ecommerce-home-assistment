
const getSuccessResponse = (data) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            message: 'Executed Successfully',
            data,
            success: true,
        }),
    };
};

module.exports = { getSuccessResponse };
