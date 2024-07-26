import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
     firstName: String,
     lastName: String,
     email: String,
     phoneNumber: String,
     password: String,
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

const userModel = mongoose.model('User', userSchema);

export default userModel;