import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        }
        catch(err) {
            console.log('Error while fetching users', err);
        }
    };
    const deleteuser = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`);
            fetchUsers();
        }
        catch(err) {
            console.log('Error while deleting the user', err);

        }
    };
    const udnoDelete = async (id) => {
        try {
            await axios.post('http://localhost:3000/users/undo');
            fetchUsers();
        }
        catch(err) {
            console.log('Error while undo', err);
        }
    };

    return (
        <div>
            <h1> User Management </h1>
            <button onClick={udnoDelete}>Undo Delete</button>
            <table>
                <thead>
                    <th>User Name</th><th>Email</th><th>Actions</th>
                </thead>
                <tbody>
                    {users.map(user => (
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button onClick={() => deleteuser(user._id)}>Delete</button></td>
                    </tr>
                        )
                    )}
                </tbody>
            </table>
            <p>
                Go back to <Link to="/">Home</Link>
            </p>
        </div>
    );

};
export default Users;