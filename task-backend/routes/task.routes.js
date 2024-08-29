// task.routes.js
const express = require('express');
const Task = require('../models/task.model.js');
const router = express.Router();

// Create new task
router.post('/tasks', async(req, res) => {
    console.log('Received POST request:', req.body);    
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    }
    catch(error) {
        res.status(400).send(error);
    }
});

// Read all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single task by ID
router.get('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found'});
        }
        res.status(200).json(task);
    }
    catch(err) {
        res.status(500).json({ error: err.message});
    }
});

// Update task by ID
router.put('/tasks/:id', async(req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!updatedTask) {
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(updatedTask);
    }
    catch(err) {
        res.status(400).json({ error: err.message});
    }
});

// Delete task by ID
router.delete('/tasks/:id', async(req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(201).json({message: 'Task deleted'});
    }
    catch(err) {
        res.status(500).json({ error: err.message});
    }
});


module.exports = router;