// EditTask.js file
import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";

const EditTask = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state;
    console.log(task);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
        tags: [],
    });

    useEffect(() => {
        if (task)  {
            // const updatetask = task.task;
            setFormData(task.task);
            // const formattedTask = {
            //     ...updatetask,
            //     dueDate: task.dueDate ? new Date(updatetask.dueDate).toISOString().split('T')[0] : ""
            // };
            // setFormData(formattedTask);
        }
    }, [task]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});
    };
    console.log("form data", formData);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/tasks/${formData._id}`, formData);
            navigate("/tasks");
        }
        catch(err) {
            console.log('Error in udpating the task', err);
        }
    };
    return (
        <div>
            <h1>Update Task</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                <label>Task Title </label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </div>
                <div>
                <label> Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
                </div>
                <div>
                <label> Status </label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                </div>
                <div>
                <label> Priority </label>
                <select name="priority" value={formData.priority} onChange={handleInputChange}>
                <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>                    
                </select>
                </div>
                <div>
                <label>Due Date</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} />
                </div>
                <div>
                <label>Tags (comma - separated)</label>
                <input type="text" value={formData.tags} onChange={handleInputChange} />
                </div>
                <button type="submit">Update Task</button>
                <button type="button" onClick={() => navigate("/tasks")}>Cancel</button>
            </form>
        </div>
    );
};
export default EditTask;