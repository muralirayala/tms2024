// searchRoutes.js
const express = require('express');
const {searchTasks, searchSubTasks, searchUsers} = require('../controllers/searchController');
const router = express.Router();

// Route for searching tasks
router.get('/tasks', searchTasks);
router.get('/subtasks', searchSubTasks);
router.get('/users', searchUsers);

module.exports = router;
