import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableStock: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming there's a Category model
        required: true,
    },
    images: [{
        type: String, // URLs or paths to the images
    }],
    variants: [{
        variantType: String, // e.g., size, color
        variantValue: String, // e.g., medium, red
        additionalPrice: Number, // Any additional cost for this variant
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review', // Assuming there's a Review model
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
});

// Pre-save middleware to update the updatedAt field
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;