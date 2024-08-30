// In your tasks controller taskcontroller.js
const Task = require('../models/task.model');

const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch(err) {
        console.log('Error while fetching tasks', err);
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
};
module.exports = {getTasks};
