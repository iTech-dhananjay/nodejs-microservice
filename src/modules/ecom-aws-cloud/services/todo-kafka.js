import Todo from '../models/todo-kafka.js';
import { sendMessage } from '../../../kafka/producer.js';

const createTodo = async (title) => {
    const newTodo = new Todo({
        title
    });
    await newTodo.save();

    await sendMessage('todo-topic', `Created Todo: ${title}`);

    return newTodo;
};


const getTodos = async () => {
    return await Todo.find();
};


const getTodoById = async (id) => {
    return await Todo.findById(id);
};


const updateTodo = async (id, updateData) => {
    return await Todo.findByIdAndUpdate(id, updateData, { new: true });
};


const deleteTodo = async (id) => {
    return await Todo.findByIdAndDelete(id);
};


export const todoKafkaService = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
