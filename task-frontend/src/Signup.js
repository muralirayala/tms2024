import React, {useState} from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password's doesn't match!!");
            return;
        }

        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, username}),
        });
        if (!response.ok) {
            console.log("Failed to submit signup data");
            return;
        }

        const data = await response.json();
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit} >
            <div>
                <label>Username: </label>
                <input type="input" value={username} onChange={(e) => setUserName(e.target.value)} />
            </div>            
            <div>
                <label>Email: </label>
                <input type="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>confirmPassword: </label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit">Signup</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
};

export default Signup;
