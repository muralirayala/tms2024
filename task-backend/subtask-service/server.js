// Server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('../common/config/dbConfig');
const errorHandler = require('../common/utils/errorHandler');
const authMiddleware = require('../common/middlewares/authMiddleware');
const subTaskRoutes = require('./routes/subTaskRoutes');
const app = express();
require('dotenv').config();

// Connect Database
connectDB();
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3003'], // Allow all origins
    credentials: true,
  }));

// Middleware for parsing json requests
app.use(express.json());

// Routes
app.use('/api/subtasks', authMiddleware, subTaskRoutes);

// ErrorHandling
app.use(errorHandler);

// Serve the static files
app.use(express.static(path.join(__dirname, '../../task-frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../task-frontend/build/index.html'));
});


// Start the server
// const PORT = process.env.PORT || 3003;
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Subtask service runnning on port ${PORT}`);
});