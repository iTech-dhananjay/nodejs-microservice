import mongoose from 'mongoose';

const todoKafkaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});


const todoKafkaModel = mongoose.model('todokafka', todoKafkaSchema);

export default todoKafkaModel;