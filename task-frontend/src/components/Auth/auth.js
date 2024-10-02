// auth.js
import axios from 'axios';

// fetch the token from user-service
export const fetchToken = async() => {
    try {
        console.log('fetchtoken is started..');
        const response = await axios.get('http://localhost:3001/auth/get-token', {withCredentials: true});
        console.log(response.data.token);
        return response.data.token;
    }
    catch(err) {
        console.log('Error While fetching token', err);
        return null;
    }
};