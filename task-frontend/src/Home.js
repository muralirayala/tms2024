import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p> Welcome to Home Page! </p>
            <p> User Management <Link to='/users'>Users List</Link></p>
            <p>
                Go to <Link to='/login'>Login</Link>
            </p>
            <p>
                Don't you have an account? <Link to="/signup">Signup</Link>
            </p>
            <p>

                Create Task <Link to='/tasks'>Create New Task</Link>
            </p>          
        </div>
    );
};
export default Home;
