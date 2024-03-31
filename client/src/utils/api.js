import axios from 'axios';
import Cookies from 'js-cookie';

const apiCall = async (method, url, data) => {
    const token = Cookies.get('token');

    try {
        const response = await axios({
            method,
            url,
            data, // Axios automatically stringifies JSON data
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : undefined 
            }
        });
        return response.data; // Axios directly returns the parsed JSON data

    } catch (error) {
        if (error.response) {
            throw error.response; 
        } else {
            // Some other network-level error occurred
            throw new Error('Network error'); 
        }
    }
}


export { apiCall };
