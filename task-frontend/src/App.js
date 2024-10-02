// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/Task';
import SubTaskForm from './pages/Subtask';
import SubTasksList from './pages/SubtasksList';

import './App.css'; // General styles for your app

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/task" element={<TaskForm />} />
                    <Route path="/subtask" element={<SubTaskForm />} />
                    <Route path='/subtasks/:taskId' element={<SubTasksList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
