import React, { useEffect, useState } from "react";
import axios from "axios";
import './TasksList.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TasksList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const fetchTasks = async (page) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/tasks?page=${page}&limit=${limit}`);
            console.log('API Response:', response.data);
            setTasks(response.data.tasks || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    useEffect(() => {
        fetchTasks(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    console.log('Tasks:', tasks);
    console.log('Tasks Length:', tasks.length);
    console.log('Total Pages:', totalPages);

    const handleEdit = async (task) => {
        navigate(`/tasks/edit/${task._id}`, { state: { task } });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            console.log('Task deleted successfully');
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error('Error in deleting the task', err);
        }
    };

    return (
        <div>
            <h1>Tasks List</h1>
            <p><Link to='/tasks'>Create New Task</Link></p>
            <p><Link to="/">Home</Link></p>
            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>
                                    <button onClick={() => handleEdit(task)}>Edit</button>
                                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No tasks available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={page === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TasksList;
