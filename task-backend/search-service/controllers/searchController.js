// searchController.js
const Task = require('../../task-service/models/taskModel');
const SubTask = require('../../subtask-service/models/subTaskModel');
const User = require('../../user-service/models/userModel');

// Search tasks based on query params(title, tags, status)
const searchTasks = async (req, res) => {
    try {
        const {title, tags, status} = req.query;
        const query = {};

        if (title) {
            query.title = {$regex: title, $options: 'i'}
        }
        if (tags) {
            query.tags = {$in: tags.split(',')};
        }
        if (status) {
            query.status = status;
        }
        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    }
    catch(err) {
        res.status(500).json({error: 'Failed to search tasks'});
    }
};

// Search subtasks based on the query parameters (title, status)
const searchSubTasks = async(req, res) => {
    try {
        const {title, status} = req.query;
        const query = {};
        if (title) {
            query.title = {$regex: title, $options: 'i'};
        }
        if (status) {
            query.status = status;
        }
        const subtasks = await SubTask.find(query);
        res.status(200).json(subtasks);
    }
    catch(err) {
        res.status(500).json({error: 'Failed to search sub tasks'});
    }
};

// Search users based on the query parameters (name, email)
const searchUsers  = async(req, res) => {
    try {
        const {name, email} = req.query;
        const query = {};
        if(name) {
            query.name = {$regex: name, $options: 'i'};
        }
        if (email) {
            query.email = {$regex: email, $options: 'i'};
        }

        const users = await User.find(query);
        res.status(200).json(users);
    }
    catch(err) {
        res.status(500).json({error: 'Failed to search users'});
    }
};

module.exports = {searchTasks, searchSubTasks, searchUsers};