const request = require('supertest');
const app = require('../server'); // Import the Express app
require('./testSetup'); // Import the setup to initialize the database

describe('Task Creation', () => {
  test('It should create a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'This is a test task',
      status: 'Pending',
      dueDate: new Date(),
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(newTask)
      .expect('Content-Type', /json/)
      .expect(201); // Expecting a 201 Created status

    expect(response.body).toHaveProperty('title', newTask.title);
    expect(response.body).toHaveProperty('description', newTask.description);
    expect(response.body).toHaveProperty('status', newTask.status);
    expect(response.body).toHaveProperty('dueDate');
  });
});
