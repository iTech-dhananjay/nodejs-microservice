import express from 'express';
import { sendMessage } from '../../../kafka/producer.js';
import { todoKafkaService } from '../services/todo-kafka.js';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

// Create a new todo
router.post('/', async (req, res) => {
    try {
        const { title  } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        await sendMessage(process.env.KAFKA_TOPIC, title);
        res.status(200).json({ success: true, message: 'Message sent to Kafka' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await todoKafkaService.getTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get todo by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await todoKafkaService.getTodoById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update todo by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await todoKafkaService.updateTodo(req.params.id, req.body);
        if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete todo by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await todoKafkaService.deleteTodo(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;