// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
console.log("Routes execution..")
// Create a new task
router.post('/tasks', taskController.createTask);

// Get all tasks
router.get('/tasks', taskController.getTasks);

// Update a task by ID
router.put('/tasks/:id', taskController.udpateTask);

// Delete a task by ID
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;