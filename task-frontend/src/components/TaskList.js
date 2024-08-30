// Taskslist.js
import React, {useEffect, useState} from "react";
import axios from "axios";
import './TasksList.css';
import { Link } from "react-router-dom";

const TasksList = () => {
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
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.status}</td>
                        <td>{task.priority}</td>
                    </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
    );
};
export default TasksList;