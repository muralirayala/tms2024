const express = require('express');
const proxy = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Proxy configuration to route API requests to microservices
app.use('/api/users', proxy({ target: `http://localhost:${process.env.USER_SERVICE_PORT}`, changeOrigin: true }));
app.use('/api/tasks', proxy({ target: `http://localhost:${process.env.TASK_SERVICE_PORT}`, changeOrigin: true }));
app.use('/api/subtasks', proxy({ target: `http://localhost:${process.env.SUBTASK_SERVICE_PORT}`, changeOrigin: true }));

const PORT = process.env.GATEWAY_PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
