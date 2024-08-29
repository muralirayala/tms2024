// task.model.js
const mongoose = require('mongoose');

const taskShema = new mongoose.Schema({
    title: { type: String, required:true},
    description: { type: String, required: true},
    status: {type: String, enum:['pending', 'inprogress', 'completed'], default:'pending'},
    dueDate: {type: Date, required: true},
    priority: {type: String, enum: ['low', 'medium', 'high'], default:'medium'},
    tags: [{type: String}]
});
module.exports = mongoose.model('Task', taskShema);
