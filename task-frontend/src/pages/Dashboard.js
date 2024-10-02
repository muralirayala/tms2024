import React, { useEffect, useState } from 'react';
import { fetchToken } from '../components/Auth/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/dashboard.css'; // Import CSS file for Dashboard page

const Dashboard = () => {
    const navigate = useNavigate();
    console.log("Dashboard request recieved");
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = await fetchToken();
                console.log('token is', token);                
                const response = await fetch('http://localhost:3003/api/tasks', {
                    headers: {
                        'x-auth-token': token,
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                console.log("task data", data);
                setTasks(data);
            } catch (err) {
                console.error('Fetch tasks error', err);
            }
        };

        fetchTasks();
    }, []);
    const handleViewSubTasks = async(taskId) => {
        try {
            const token = await fetchToken();
            console.log("token is", token);
            navigate(`/subtasks/${taskId}`, {
                state: {token}
            });
        }
        catch(err) {
            console.log('Failed to fetch token', err);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <p><Link to="/task" className="home-link-button">Create Task</Link></p>
            <p><Link to="/subtask" className="home-link-button">Create Sub Task</Link></p>
            <div className="tasks-table">
                <h2>Tasks</h2>
                {tasks.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>SubTasks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>{task.priority}</td>
                                    <td>
                                        <button onClick={() => handleViewSubTasks(task._id)} className='subtasks-link'>View SubTasks</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
