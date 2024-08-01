import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     location: {
          type: String,
          required: true,
     },
     products: [{
          productId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Product',
               required: true,
          },
          stockInWarehouse: {
               type: Number,
               required: true,
               min: 0, // Ensure the stock is not negative
          },
     }],
     createdAt: {
          type: Date,
          default: Date.now,
     },
     updatedAt: {
          type: Date,
          default: Date.now,
     },
});

// Pre-save middleware to update the updatedAt field
warehouseSchema.pre('save', function(next) {
     this.updatedAt = Date.now();
     next();
});

const warehouseModel = mongoose.model('Warehouse', warehouseSchema);

export default warehouseModel;