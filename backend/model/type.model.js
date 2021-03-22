import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    description: String,
    store_name: String,
    is_deleted: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    },
});

export default new mongoose.model('Type', typeSchema);
