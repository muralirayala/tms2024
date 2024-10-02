// Subtask.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/styles/subtask.css';
import { fetchToken } from '../components/Auth/auth';

const SubTaskForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
        parentTaskId: '66e5865e081238923620be11',
        createdBy: '66e519b530dbb6a827e2ba88',
    });
    const navigate = useNavigate();
    const [token, setToken] = useState(null); // Hold the token in state
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
        const {name, value} = e.target;
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
            await axios.post('http://localhost:3002/api/subtasks', formData, {
                headers: {
                    'x-auth-token': token,
                }
            });
            setSuccess('Subtask created successfully.');
            setError('');
            navigate('/Dashboard');
        }
        catch(err) {
            setError('Failed while creating subtask');
            setSuccess('');
        }
    };
    return (
        <div className='form-container'>
            <p><Link to="/dashboard" className="home-link-button">Dashboard</Link></p>
            <h2 className='form-title'>Create SubTask</h2>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            <form onSubmit={handleSubmit} className='subtask-form'>
                <div className='form-group'>
                    <label>Title</label>
                    <input type='text' className="form-input" name='title' value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea name='description' className="form-textarea" value={formData.description} onChange={handleInputChange} required></textarea>
                </div>
                <div className='form-group'>
                    <label>Status</label>
                    <select name='status' className="form-select" value={formData.status} onChange={handleInputChange}>
                        <option value='pending'>Pending</option>
                        <option value='in-progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Due date</label>
                    <input type='date' className="form-input" name='dueDate' value={formData.dueDate} onChange={handleInputChange} required />
                </div>
                <div className='form-group'>
                    <label>Parent Task ID</label>
                    <input type='text' className="form-input" name='parentTaskId' value={formData.parentTaskId} onChange={handleInputChange} required />
                </div>
                <div className='form-group'>
                    <label>Created By</label>
                    <input type='text' className="form-input" name='createdBy' value={formData.createdBy} onChange={handleInputChange} />
                </div>
                <button type='submit' className='submit-button'>Create SubTask</button>
            </form>
        </div>
    );
};
export default SubTaskForm;