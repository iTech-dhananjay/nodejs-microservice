import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    type: {
        type: String,
        enum: ['home', 'work', 'other'],
        default: 'home',
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
});

const addressModel = mongoose.model('Address', addressSchema);
export default addressModel;