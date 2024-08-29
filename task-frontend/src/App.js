import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import Users from './Users';
import TaskForm from './components/TaskForm';
import CreateTask from './components/CreateTask';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/tasks' element={<TaskForm />} />
          <Route path='/create-task' element={<CreateTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
