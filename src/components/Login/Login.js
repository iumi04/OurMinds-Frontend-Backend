import React, { useState } from 'react';
import './Login.css';
import apiService from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const token = await apiService.login({ username, password });
            localStorage.setItem('token', token);
            setToken(token);
            navigate('/today');
        } catch (err) {
            setError('Invalid username or password');
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}