// taskController.js
const Task = require('../models/taskModel');
const authController = require('../../user-service/controllers/authController');
const notificationService = require('../services/notificationService');

// Create Task
exports.createTask = async (req, res) => {
    console.log('create Task api request recieved');
    console.log("token", authController.getToken);
    try {
        const {title, description, status, priority, dueDate, tags, createdBy} = req.body;
        console.log('created task request recieved', req.body);
        const task = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            tags,
            createdBy, // Set created by login user
            createdAt: Date.now(),
        });
        await task.save();
        console.log('Task created successfully..');
        // Send notification after task creation
        notificationService.sendNotification(createdBy, 'New task created successfully');
        res.status(201).json(task);
    }
    catch(err) {
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

// Fetch tasks for internal use
exports.getTasksInternal = async () => {
    try {
        const tasks = await Task.find();
        return tasks;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        throw err; // Throw error to be caught by calling function
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('createdBy', 'name email');
        res.json(tasks);
    }
    catch(err) {
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

// Update a task
exports.udpateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!task) {
            return res.status(400).json({message: 'Task not found!'});
        }

        notificationService.sendNotification(task.createdBy, 'Task updated Successfully');
        res.json(task);
    }
    catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(400).json({message: 'Task not found!'});
        }
        notificationService.sendNotification(task.createdBy, 'Task deleted successfully.');

        res.json({message: 'Task deleted successfully.'})
    }
    catch(err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

