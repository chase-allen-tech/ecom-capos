import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    user_id: String,
    store_name: String,
    name: String,
    brand: String,
    handle: String,
    sku: {
        type: String,
        // unique: true,
    },
    description: String,
    tag: {
        type: Array,
        default: []
    },
    type: String,
    enabled: {
      type: Boolean,
      default: true,
    },
    image: {
        type: String,
        default: ''
    },
    supplier: String,
    supplier_code: String,
    supply_price: {
        type: Number,
        default: 0
    },
    markup: {
        type: Number,
        default: 0
    },
    retail_price: {
        type: Number,
        default: 0
    },
    inventory: {
        type: Number,
        default: 0
    },
    reorder_point: {
        type: Number,
        default: 0
    },
    reorder_amount: {
        type: Number,
        default: 0
    },
    tax: String,
    tracking_inv: {
        type: Boolean,
        default: true,
    },
    variant_inv: {
        type: Boolean,
        default: false,
    },
    variant_products: [
        {
            name: String,
            sku: String,
            supplier_code: String,
            supply_price: String,
            retail_price: String,
            enabled:Boolean,
            inventory: {
                type: Number,
                default: 0
            },
            reorder_point: {
                type: Number,
                default: 0
            },
            reorder_amount: {
                type: Number,
                default: 0
            },
            tax: String,
            markup: Number,
            image: {
                type: String,
                default: ''
            }
        }
    ],
    variants: [
        {
            attribute: '',
            value: []
        }
    ],
    is_deleted: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    },
});

export default new mongoose.model('Product', productSchema);
