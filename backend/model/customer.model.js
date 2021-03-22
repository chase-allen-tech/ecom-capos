import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    user_id: String,
    store_name: String,
    name: String,
    group: String,
    email: String,
    contact: String,
    physical_street1: {
        type: String,
        default: ''
    },
    physical_street2: {
        type: String,
        default: ''
    },
    physical_suburb: {
        type: String,
        default: ''
    },
    physical_postcode: {
        type: String,
        default: ''
    },
    physical_state: {
        type: String,
        default: ''
    },
    physical_country: {
        type: String,
        default: ''
    },
    exist_postal_address: {
        type: Boolean,
        default: false
    },
    postal_address: {
        postal_street1: String,
        postal_street2: String,
        postal_suburb: String,
        postal_postcode: String,
        postal_state: String,
        postal_country: String,
    },
    code: String,
    company: String,
    birthday: Date,
    gender: String,
    website: String,
    twitter: String,
    note: String,
    field1: String,
    field2: String,
    account: {
        type: Number,
        default: 0
    },
    total_spent: {
        type: Number,
        default: 0
    },
    store_credit: {
        type: Number,
        default: 0
    },
    total_issued: {
        type: Number,
        default: 0
    },
    total_redeemed: {
        type: Number,
        default: 0
    },
    balance:[
        {
            amount: {
                type: Number,
                default: 0
            },
            type: {
                type: String,
                default: 'cash'
            },
            register: {
                type: String,
                default: 'main register',
                lowercase: true
            }
        }
    ],
    is_deleted: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    },
});

export default new mongoose.model('Customer', customerSchema);
