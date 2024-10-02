import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { fetchToken } from "../components/Auth/auth";
import '../assets/styles/subtasksList.css';

console.log('Subtaskslist page is requested..');
const SubTasksList = () => {
    const { taskId } = useParams();
    const [subtasks, setSubtasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    console.log('subtask page is calling');

    useEffect(() => {
        console.log('useeffect function executing');
        
        if (!taskId) {
            console.error('No taskId found');
            return;
        }

        const fetchSubTasks = async () => {
            try {
                const token = await fetchToken();
                console.log('token is', token);
                
                const response = await fetch(`http://localhost:3002/api/subtasks/${taskId}`, {
                    headers: {
                        'x-auth-token': token,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch subtasks');
                }

                const data = await response.json();
                console.log("API response data", data);

                if (data && Array.isArray(data.subtasks)) {
                    setSubtasks(data.subtasks);
                    console.log("subtasks list", data.subtasks);
                } else {
                    setSubtasks([]);
                    console.log('No subtasks found');
                }

                setTaskTitle(data.title || "Untitled Task");
            }
            catch (err) {
                console.error('Error while fetching Subtasks', err);
                setSubtasks([]);
            }
        };
        fetchSubTasks();
    }, [taskId]);

    return (
        <div className="subtasks-list-container">
        <p><Link to="/dashboard" className="home-link-button">Dashboard</Link></p>
        <p><Link to="/subtask" className="home-link-button">Create Sub Task</Link></p>
            <h1>Subtasks for {taskTitle}</h1>
            <div className="subtasks-table">
                <table>
                    <thead>
                        <tr>
                            <th>Subtask Name</th>
                            <th>Status</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subtasks.length > 0 ? (
                            subtasks.map((subtask) => (
                                <tr key={subtask._id}>
                                    <td>{subtask.title}</td>
                                    <td>{subtask.status}</td>
                                    <td>{new Date(subtask.dueDate).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No subtasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubTasksList;
