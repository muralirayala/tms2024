import React, { useEffect, useState } from 'react';
import { fetchToken } from '../components/Auth/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import TaskChart from '../components/TaskChart';
import '../assets/styles/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]); // Manage tasks state

    // Fetch all tasks on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = await fetchToken();
                const response = await fetch('http://localhost:3003/api/tasks', {
                    headers: {
                        'x-auth-token': token,
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data); // Initially set all tasks
            } catch (err) {
                console.error('Fetch tasks error', err);
            }
        };

        fetchTasks();
    }, []);

    // Handle view sub-tasks
    const handleViewSubTasks = async(taskId) => {
        try {
            const token = await fetchToken();
            navigate(`/subtasks/${taskId}`, { state: { token } });
        } catch(err) {
            console.log('Failed to fetch token', err);
        }
    };

    // Handle search results and override tasks
    const handleSearchResults = (results) => {
        const validTasks = results.filter(task => task._id && task.title); // Ensure valid tasks
        setTasks(validTasks); // Override tasks with search results
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <TaskChart />
            <p><Link to="/task" className="home-link-button">Create Task</Link></p>
            <p><Link to="/subtask" className="home-link-button">Create Sub Task</Link></p>
            
            {/* Pass handleSearchResults to SearchComponent to update tasks */}
            <SearchComponent entity="tasks" onSearchResults={handleSearchResults} /> 

            <div className="tasks-table">
                <h2>Tasks</h2>
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
                        {Array.isArray(tasks) && tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task._id}>
                                    <td>{task.title || "Untitled"}</td>
                                    <td>{task.description || "No description available"}</td>
                                    <td>{task.status || "Unknown"}</td>
                                    <td>{task.priority || "Not specified"}</td>
                                    <td>
                                        <button onClick={() => handleViewSubTasks(task._id)} className='subtasks-link'>View SubTasks</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
