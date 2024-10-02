// sbutask controller.js
const SubTask = require('../models/subTaskModel');
const Task = require('../../task-service/models/taskModel');

const notificationService = require('../services/notificationService');

// Create a new sub task
exports.createSubTask = async (req, res) => {
    try {
        console.log("Subtask request recieved..");
        console.log("Subtask input", req.body);
        const subTask = new SubTask({
            ...req.body,
            parentTaskId: req.body.parentTaskId,
            // createdBy: req.user._id,
            createdBy: req.body.createdBy
        });
        console.log("Subtask data", subTask);
        await subTask.save();
        notificationService.sendNotification('SubTask Created', subTask);
        console.log("Subtask data created successfully");
        res.status(201).json(subTask);
    }
    catch(err) {
        res.status(400).json({ error: err.message});
    }
};

// Get all sub-tasks for a parent task
exports.getSubTasks = async(req, res) => {
    console.log("GetSubTasks request recieved", req);
    try {
        console.log("Subtask request recieved", req);
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({message: "Task not found"});
        }
        console.log("Task Information", task);
        const subTasks = await SubTask.find({parentTaskId: req.params.taskId});
        console.log("Subtask information", subTasks);
        res.json({
            title: task.title,
            subtasks: subTasks
        });
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }

};

// Update sub-task
exports.updateSubTask = async(req, res) => {
    try {
        console.log("Update subtask recieved", req);
        const subTask = await SubTask.findByIdAndUpdate(req.params.id, req.body, {new: true});
        notificationService.sendNotification('SubTask Updated', subTask);
        res.json(subTask);
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
};

// Delete a sub-task
exports.deleteSubTask = async(req, res) => {
    try {
        console.log("delete subtask request recieved");
        await SubTask.findByIdAndDelete(req.params.id);
        notificationService.sendNotification('SubTask Deleted', {subTaskId: req.params.id});
        res.json({message: 'Sub-Task deleted'});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
};
