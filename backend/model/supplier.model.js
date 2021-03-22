import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    user_id: String,
    store_name: String,
    name: String,
    markup: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    mobile: {
        type: String,
        default: ''
    },
    fax: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
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
    exist_postal_address: Boolean,
    postal_address: {
        postal_street1: String,
        postal_street2: String,
        postal_suburb: String,
        postal_postcode: String,
        postal_state: String,
        postal_country: String,
    },
    is_deleted: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    },
});

export default new mongoose.model('Supplier', supplierSchema);
