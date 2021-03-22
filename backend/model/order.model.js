import mongoose from 'mongoose';
const schema = mongoose.Schema;

const orderSchema = new schema({
    user_d: String,
    store_name: String,
    type: {
        type: String,
        default: 'purchase'
    },
    supplier: {
        type: String,
        default: ''
    },
    deliver_to: {
        type: String,
        default: ''
    },
    invoice_number: {
        type: String,
    },
    order_number: String,
    deliver_date: {
        type: Date,
        default: new Date()
    },
    created_by: String,
    note: {
        type: String
    },
    status: {
        type: String,
        default: 'open'
    },
    products: [
        {
            product_id: {
                type: String,
            },
            variant_id: {
                type: String,
            },
            name: {
                type: String,
                default: ''
            },
            sku : String,
            inventory: {
                type: Number,
                default: 0
            },
            qty: {
                type: Number,
                default: 0
            },
            received_qty: {
                type: Number,
                default: 0
            },
            supply_price: {
                type: String,
            },
            markup: {
                type: String
            },
            enabled: {
                type: Boolean,
                default: false
            },
        }
    ],
    created: {
        type: Date,
        default: new Date(),
    }
});

export default new mongoose.model('Order', orderSchema);
