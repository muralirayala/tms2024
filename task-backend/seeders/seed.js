// seed.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const connectDB = require('../common/config/dbConfig');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../user-service/models/userModel');
const Task = require('../task-service/models/taskModel');
const Subtask = require('../subtask-service/models/subTaskModel');
require('dotenv').config();

connectDB();

const generateUsers = async(num) => {
    const users = [];
    for (let i=0; i<num; i++) {
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash('123456', salt);          
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
        });
    }
    await User.insertMany(users);
    console.log(`${num} users inserted`);
};

const generateTasks = async(num, userIds) => {
    const tasks = [];
    console.log('userids', userIds);
    for (let i=0; i<num; i++) {
        tasks.push({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement(['pending', 'in-progress', 'completed']),
            priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
            dueDate: faker.date.between({ from: '2024-10-01', to: '2025-12-12' }),
            createdBy: faker.helpers.arrayElement(userIds)._id.toString(),
            createdAt: new Date(),
        });
    }
    await Task.insertMany(tasks);
    console.log(`${num} tasks inserted`);
};

const generateSubTasks = async(num, userIds, taskIds) => {
    const subtasks = [];
    const tasks = await Task.find(); 
    if (!tasks.length) {
        throw new Error('No tasks found to assign subtasks to');
    }
    for (let i=0; i<num; i++) {
        const randomTask = faker.helpers.arrayElement(tasks);
        console.log("random task", randomTask);
        subtasks.push({
            title:  faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement(['pending', 'in-progress', 'completed']),
            dueDate: faker.date.between({ from: '2024-10-01', to: '2025-12-12' }),
            createdBy: randomTask.createdBy,
            parentTaskId: randomTask._id,
        });
    }
    await Subtask.insertMany(subtasks);
    console.log(`${num} subtasks inserted`);
};

const seedDatabase = async() => {
    await mongoose.connection.dropDatabase();

    const numUsers = 1000;
    const numTasks = 5000;
    const numSubTasks = 5000;
    await generateUsers(numUsers);

    // Fetch all user ids
    const userIds = await User.find().select('_id').lean();
    await generateTasks(numTasks, userIds);

    // fetch all task ids
    const taskIds = await Task.find().select('_id').lean();
    await generateSubTasks(numSubTasks, userIds, taskIds);

    mongoose.disconnect();
};

seedDatabase();