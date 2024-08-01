import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
     ipAddress: {
          type: String,
          required: true,
     },
     device: {
          type: String,
          required: true,
     },
     location: {
          type: String,
          default: null,
     },
     createdAt: {
          type: Date,
          default: Date.now,
     },
});

const userSchema = new mongoose.Schema({
     firstName: String,
     lastName: String,
     email: {
          type: String,
          unique: true,
          required: true,
     },
     phoneNumber: String,
     password: {
          type: String,
          required: true,
     },
     role: {
          type: String,
          enum: ['admin', 'user'],
          default: 'user',
     },
     isApproved: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
     },
     permissions: {
          type: [String],
          default: [],
     },
     addressIds: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address',
     }],
     orderIds: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
     }],
     wishlistIds: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Wishlist',
     }],
     reviewIds: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review',
     }],
     paymentInfoIds: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Payment',
     }],
     profilePicture: {
          type: String,
          default: null,
     },
     createdAt: {
          type: Date,
          default: Date.now,
     },
     updatedAt: {
          type: Date,
          default: Date.now,
     },
     sessions: [sessionSchema],
});

// Function to set default permissions based on role
userSchema.methods.setDefaultPermissions = function() {
     if (this.role === 'admin') {
          this.permissions = ['create', 'read', 'update', 'delete'];
     } else {
          this.permissions = ['read'];
     }
};

// Pre-save middleware to set default permissions
userSchema.pre('save', function(next) {
     if (this.isNew) {
          this.setDefaultPermissions();
     }
     next();
});

// Pre-save middleware to update the updatedAt field
userSchema.pre('save', function(next) {
     this.updatedAt = Date.now();
     next();
});

const userModel = mongoose.model('User', userSchema);

export default userModel;