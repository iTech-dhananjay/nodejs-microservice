import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

const wishlistModel = mongoose.model('Wishlist', wishlistSchema);
export default wishlistModel;