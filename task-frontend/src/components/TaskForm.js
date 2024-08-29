import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ onSubmit, task }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'pending');
    const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
    const [priority, setPriority] = useState(task ? task.priority : ''); // Default to an empty string
    const [tags, setTags] = useState(task ? task.tags.join(', ') : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            status,
            dueDate,
            priority,
            tags: tags.split(',').map(tag => tag.trim())
        };

        try {
            if (task) {
                const response = await axios.put(`http://localhost:3000/api/tasks/${task.id}`, taskData);
                console.log('Task updated:', response.data);
            } else {
                const response = await axios.post('http://localhost:3000/api/tasks', taskData);
                console.log('Task created:', response.data);
            }
            if (typeof onSubmit === 'function') {
                onSubmit();
            }          
        } catch (err) {
            // Log detailed error information
            console.error('Error object:', err);
            console.error('Error message:', err.message);
            console.error('Error stack:', err.stack);            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Status</label>
                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label>Due Date</label>
                <input type="date" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
                <label>Priority</label>
                <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label> Tags (comma-separated)</label>
                <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <button type='submit'>Save</button>
        </form>
    );
};

export default TaskForm;
