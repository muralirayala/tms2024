// Taskslist.js
import React, {useEffect, useState} from "react";
import axios from "axios";
import './TasksList.css';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const TasksList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/tasks')
        .then(response => {
            if (Array.isArray(response.data)) {
                setTasks(response.data);
            }
            else {
                console.error('Api didnt return an array of tasks', response.data);
            }
        })
        .catch(error => {
            console.error('There was an error fetching the tasks!', error);
        });
    }, []);

    const handleEdit = async (task) => {
        navigate(`/tasks/edit/${task._id}`, {state: {task}});
    };
    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            console.log('Task deleted successfully');
            setTasks(tasks.filter(task => task._id !== id));
        }
        catch(err) {
            console.error('Error in deleting the task', err);
        }
    };
    
    return (
        <div>
            <h1> Tasks List </h1>
            <p><Link to='/tasks'>Create New Task</Link></p>
            <p><Link to="/">Home</Link></p>
            <table class="tasks-table">
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.status}</td>
                        <td>{task.priority}</td>
                        <td>
                            <button onClick={() => handleEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
    );
};
export default TasksList;