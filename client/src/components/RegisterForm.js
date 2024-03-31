import React, { useState } from 'react';
import { apiCall } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState('');  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(''); // Clear any previous errors

        try {
            await apiCall('post', '/api/register', { username, email, password });
            navigate('/protected'); 
        } catch (err) {
            setError(error?.message  || 'Registration failed'); 
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {/* Add fields for email and password similarly */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
        </div>
    )
}

export default RegisterForm;
