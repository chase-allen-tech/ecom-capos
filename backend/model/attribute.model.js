import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema({
    user_id: String,
    store_name: String,
    name: String,
    description: String,
    is_deleted: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    },
});

export default new mongoose.model('Attribute', attributeSchema);
