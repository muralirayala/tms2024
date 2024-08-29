const mongoose = require('mongoose');
const Task = require('../models/task.model');
// const faker = require('faker');
const { faker } = require('@faker-js/faker');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    seedTasks();
}).catch(err => {
    console.log('Could not connected to MongoDB', err);
});

async function seedTasks() {
    const tasks = [];
    for (let i=0; i<500; i++) {
        tasks.push({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement(['pending', 'in progress', 'completed']),
            dueDate: faker.date.future(),
            priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
            tags: faker.helpers.arrayElements(['work', 'personal', 'urgent', 'nodejs', 'app', 'learning'], {min:1, max:3})
        });
    }
    try {
        await Task.insertMany(tasks);
        console.log('Seeded 500 tasks');
        process.exit();
    } catch(err) {
        console.log('Error seeding tasks', err);
        process.exit(1);
    }
}