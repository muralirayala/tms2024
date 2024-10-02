// Login.js 
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../assets/styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response data in Login page', errorData);
                return;
            }
            const {token, user} = await response.json();
            try {

                console.log('Response recieved', token, user);
                console.log('localstorage started..');
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Localstorage Setup saved succesffuly..")
                console.log(localStorage.getItem('token'));
            }
            catch(err) {
                console.error("Error while localStorage setItem", err);
            }

            navigate('/');
        }
        catch(err) {
            console.log("Error in Login Page", err);
        }
    };
    return (
        <div className='login-container'>
            <h1> Login Page </h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>Login</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <p><Link to="/">Home</Link></p>
            </form>

        </div>
    );
};
export default Login;
