// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define route to get token
router.get('/get-token', authController.getToken);

module.exports = router;