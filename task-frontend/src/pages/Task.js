import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../assets/styles/task.css';
import { fetchToken } from '../components/Auth/auth';

const TaskForm = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null); // Hold the token in state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        dueDate: '',
        tags: '',
        createdBy: '66e519a830dbb6a827e2ba82'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch the token after the component renders
    useEffect(() => {
        const getToken = async () => {
            try {
                const fetchedToken = await fetchToken();
                setToken(fetchedToken);
                console.log('Token fetched:', fetchedToken);
            } catch (err) {
                setError('Failed to fetch token');
            }
        };
        getToken();
    }, []); // Empty dependency array to run once when the component mounts

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure that token has been fetched
            if (!token) {
                setError('Token not available');
                return;
            }

            // Split tags by commas and trim whitespace
            const updateFormatedData = { ...formData, tags: formData.tags.split(',').map(tag => tag.trim()) };

            await axios.post('http://localhost:3003/api/tasks', updateFormatedData, {
                headers: {
                    'x-auth-token': token,
                }
            });

            setSuccess('Task created Successfully!');
            setError('');
            navigate('/Dashboard');
        } catch (err) {
            setError('Failed while creating task');
            setSuccess('');
        }
    };

    return (
        <div className="form-container">
            <p><Link to="/dashboard" className="home-link-button">Dashboard</Link></p>
            <p><Link to="/subtask" className="home-link-button">Create Sub Task</Link></p>            
            <h2 className="form-title">Create Task</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="form-input" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" className="form-textarea" value={formData.description} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="form-select">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleInputChange} className="form-select">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Tags (comma separated)</label>
                    <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Created By (User ID)</label>
                    <input type="text" name="createdBy" value={formData.createdBy} onChange={handleInputChange} className="form-input" />
                </div>
                <button type="submit" className="submit-button">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
