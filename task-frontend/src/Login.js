// src/Login.js
import React, {useState} from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Sending request with:', { email, password });
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            console.log('Raw response:', response);
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error response Data', errorData);
                return;
            }
            else {
                const data = await response.json();
                console.log('Response recieved', data);
                navigate('/');
            }
        }
        catch (err) {
            console.log('catch Err', err);
        }
    };
    return (
        <form onSubmit={(handleSubmit)} >
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
            <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='sumbit'>Login</button>
            {/* {message && <p>{message}</p>} */}
            <p>
                Don't you have an account? <Link to="/signup">Signup</Link>
            </p>            
            <p>
                Go back to <Link to="/">Home</Link>
            </p>
        </form>
    );


};

export default Login;