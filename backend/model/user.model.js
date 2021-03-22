import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import vars from '../config/var.config';

const userSchema = new mongoose.Schema({
    private_web_address: {
        type: String,

    },
    store_name: {
        type: String,
        required: true,
        default: "newonestore"
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        default: "Doe"
    },
    email: {
        type: String,
        default: "doe@gmail.com"
    },
    password: {
        type: String,
        index: true,
        trim: true,
        default: "000"
    },
    ip_address: {
      type: String,
    },
    city: String,
    currency_code: String,
    phone: {
        type: String,
        default: "444512555555"
    },
    email_verify: {
        type: Boolean,
        default: false
    },
    receipt_name: {
      type: String,
    },
    receipt_style: {
      type: String,
    },
    print_barcode: {
      type: String,
    },
    logo: {
      type: String,
    },
    header_string: {
      type: String,
    },
    invoice_prefix: {
      type: String,
    },
    invoice_heading: {
      type: String,
    },
    served_label: {
      type: String,
    },
    discount_label: {
      type: String,
    },
    sub_total: {
      type: String,
    },
    tax_label: {
      type: String,
    },
    to_pay_label: {
      type: String,
    },
    total_label: {
      type: String,
    },
    change_label: {
      type: String,
    },
    footer_text: { type: String, },
    created_on: { type: String,},
    updated_on: { type: String,},
    is_deleted: {type: String,},
    website: { type: String,},
    twitter: {type: String,},
    profile_img: {type: String,},


    country: {type: String,},
    suburb: { type: String,},
    street_address: { type: String,},
    postcode: { type: String, },
    state: { type: String,},
    p_street_address: { type: String, },
    p_city: {type: String},
    p_suburb: {type: String,},
    p_postcode: {
      type: String,
    },
    p_state: {
      type: String,
    },
    p_country: {
      type: String,
    },

    sales_tax: {
      tax_name: { type: String },
      percentage: { type: String },
      created_on: { type: String },
      is_deleted: { type: String }
    },

    outlet: {
      flag: { type: String },
      status: { type: String },
      supplierReturnNumber: { type: String },
      supplierReturnPrefix: { type: String },
      timezone: { type: String}
    },





    role: {
        type: String,
        enum: ['free', 'cashier', 'manager', 'admin'],
        default: 'free',
    },
});


userSchema.pre('save', async function save(next) {
    try {
        const rounds = vars.env === 'development' ? 1 : 10;
        this.password = await bcrypt.hash(this.password, rounds);
        return next();
    } catch(error) {
        return next(error);
    }
});

export default mongoose.model('User', userSchema);
