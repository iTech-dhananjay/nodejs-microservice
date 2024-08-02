import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: mongoose.Schema.Types.ObjectId,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: String,
    reviewDate: {
        type: Date,
        default: Date.now,
    },
});

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel;