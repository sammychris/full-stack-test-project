import React, { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie'; 

const ProtectedPage = () => {
    const [content, setContent] = useState('Loading...');
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await apiCall('get', '/api/protected');
                setContent(response.content);
                setIsLogin(true);
            } catch (response) {
                if (response.status === 401) {
                    navigate('/login'); // Redirect to login on unauthorized access
                } else {
                    setContent('Error fetching data'); 
                }
            }
        }

        fetchProtectedData();
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    }

    return (
        <div>
            <h1>Protected Content</h1>
            <p>{content}</p>
            {isLogin && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
}

export default ProtectedPage;
