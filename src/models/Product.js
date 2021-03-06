const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        productType: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = (conn) => {
    return conn.model('Product', ProductSchema);
};
