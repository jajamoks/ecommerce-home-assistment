const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: false,
            default: 'John Doe' // hardcode for now
        },
        cartItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],

    },
    {
        timestamps: true,
    }
);

module.exports = (conn) => {
    return conn.model('Cart', CartSchema);
};
