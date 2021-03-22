import mongoose from 'mongoose';

const cartSchema =  new mongoose.Schema({
    store_name: String,
    outlet: {
        type: String,
        default: 'main'
    },
    user_id: String,
    products: [
        {
            product_id: String,
            variant_id: String,
            product_name: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            qty: {
                type: Number,
                default: 0
            },
            retail_price: {
                type: Number,
                default: 0
            },
            discount_value: {
                type: Number,
                default:  0
            },
            discount_symbol: {
                type: String,
                default:  '%'
            },
            note: {
                type: String,
                default: ''
            },
        }
    ],
    payments: [
        {
            type: {
                type: String,
                default: 'cash',
            },
            amount:{
                type: Number,
                default: 0
            },
            created: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    payment_status: {
        type: String,
        default: 'not paid'
    },
    sale_status: {
        type: String,
        default: 'usual'
    },
    note: String,
    discount_value: {
        type: Number,
        default: 0
    },
    discount_symbol: {
        type: String,
        default: '$'
    },
    tax: {
        type: String,
        default: ''
    },
    customer: {
        customer_id: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: ''
        },
    },
    total: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        default: 0
    },
    total_items: {
        type: Number,
        default: 0
    },
    change: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

export default new mongoose.model('cart', (cartSchema));
