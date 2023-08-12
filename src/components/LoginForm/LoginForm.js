import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            console.log(response.data);
            setError('');
            const token = response.data;

            localStorage.setItem('token', token);

            onLogin();
            history.push('/home');
            window.location.reload();
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p>New Here? Click here to <a href='/register'>Register</a></p>
        </div>
    );
};

export default LoginForm;
