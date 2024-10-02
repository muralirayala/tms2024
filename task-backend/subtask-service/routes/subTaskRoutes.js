// SubTaskModel.js
const express = require('express');
const {createSubTask, getSubTasks, updateSubTask, deleteSubTask} = require('../controllers/subTaskController');
const router = express.Router();

// create new sub-task
router.post('/', createSubTask);

// Get all sub-tasks for a specific task
router.get('/:taskId', getSubTasks);

// update sub-task
router.put('/:id', updateSubTask);

// Delete a sub-task
router.delete('/:id', deleteSubTask);

module.exports = router;