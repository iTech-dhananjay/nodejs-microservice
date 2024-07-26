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
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
