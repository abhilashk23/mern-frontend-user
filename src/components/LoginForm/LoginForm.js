import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import dummy from '../../images/dummy.png'
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const history = useHistory();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [succcess, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log({ username, password });
            await axios.post('https://user-login-api.onrender.com/users/login', { username, password })
                .then((response) => response.data)
                .then((data) => setTimeout(() => {
                    setSuccess('Loading...')
                    const token = data;

                    localStorage.setItem('token', token);

                    // onLogin();
                    history.push(`/home/${username}`);
                    window.location.reload();
                }), 1000)
                .catch(error => setError('Invalid Credentials'))


        } catch (error) {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="flex flex-row">
            <div className='2xl:w-1/3 hidden 2xl:flex items-center justify-center h-screen bg-fuchsia-400'>
                <img src={dummy} alt='Dummy image' />
            </div>
            <div className='w-full 2xl:w-2/3 flex flex-col p-5'>
                <div className='grid justify-items-start'>
                    <a href="/"><p className='p-1 text-2xl font-bold'>LOGO</p></a>
                </div>
                <br />
                <br />
                <br />
                <div className='login-form w-full flex flex-col justify-center items-center'>
                    <h2 className='text-4xl font-bold'>Welcome back!</h2>
                    <p className='py-2 text-lg'>Login to your account</p>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full my-3 gap-y-3'>
                        <div className='w-full flex flex-row items-center justify-items-center gap-x-4'>
                            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} required />
                        </div>
                        <div className='w-full flex flex-row items-center justify-items-center gap-x-4'>
                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        {succcess &&  <div className="error-message text-black">{error}</div>}
                        {error && <div className="error-message text-red-600">{error}</div>}

                        <button type="submit" disabled={!username || !password} className='w-4/5 bg-fuchsia-600 disabled:bg-neutral-300 text-white disabled:text-neutral-500 p-2.5 rounded-full font-medium text-xl'>Login</button>
                    </form>

                    <p className='text-md mt-5'>New here? Click here to <a href="/register" className='text-fuchsia-700 underline decoration-fuchsia-700'>Register</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
