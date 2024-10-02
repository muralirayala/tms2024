// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/home.css'; // You can create this file to style your home page

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Task Management App</h1>
            <p>Manage your tasks effectively and stay productive.</p>

            <div className="home-links">
                <Link to="/login" className="home-link-button">Login</Link>
                <Link to="/signup" className="home-link-button">Sign Up</Link>
                <Link to="/dashboard" className="home-link-button">Dashboard</Link>
            </div>
        </div>
    );
};

export default Home;
