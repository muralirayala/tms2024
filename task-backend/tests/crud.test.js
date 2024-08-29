// tests/crud.test.js
const request = require('supertest');
const app = require('express');
const mongoose = require('mongoose');
const Task = require('../models/task.model');
const taskRoutes = require('../routes/task.routes');
require('./testSetup');

// Setup minimal express app for testing
const app = express();
app.use(express.json());
app.use('/api', taskRoutes);

describe('Task CRUD Operations', () => {
    let taskId;
    // Create Task
    it('should create a new task', async() => {
        const response = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test task',
                description: 'This is a test task',
                status: 'pending',
                dueDate: '2024-08-16'
            });
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe('Test task');
            taskId = response.body._id;
    });

    // Read Task
    it('should retrieve a task by id', async() => {
        const response = await request(app)
            .get(`/api/tasks/${taskId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(taskId);
    });

    // Update Task
    it('should update a task', async() => {
        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .send({
                title: 'Updated Test Task',
                description: 'This is updated test task'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe('Updated Test Task');
    });

    // Delete Task
    it('should delete a task', async() => {
        const response = await request(app)
            .delete(`/api/tasks/${taskId}`);
        
        expect(response.statusCode).toBe(200);
        const deletedTask = await Task.findById(taskId);
        expect(deletedTask).toBeNull();
    });
});
