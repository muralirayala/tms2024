// Register.js
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/styles/register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log("Passwords donot match");
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error While registering', errorData);
                return;
            }
            const data = await response.json();
            console.log('Register data recieved', data);
            navigate('/');
        }
        catch(err) {
            console.error("Error in registering the User", err);
        }
    };
    return(
        <div className="register-container">
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
                <p><Link to="/login">Login</Link></p>
                <p><Link to="/">Home</Link></p>
            </form>
        </div>
    );
};
export default Register;