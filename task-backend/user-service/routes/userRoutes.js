// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../../common/middlewares/authMiddleware');
// const authController = require('../controllers/authController');

// public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// private route require authentication
router.post('/me', authMiddleware, userController.getUser);

module.exports = router;
