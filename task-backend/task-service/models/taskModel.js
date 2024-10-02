// taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    dueDate: {
        type: Date,
    },
    tags: [String],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    udpatedAt: {
        type: Date,
        default: Date.now,
    }
},
{
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
