import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import dummy from '../../images/dummy.png'
import logo from '../../images/logo.png';

const RegisterForm = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      await axios.post('https://user-login-api.onrender.com/users/register', formData);
      alert('User registered successfully! Click Ok to go to Login');
      history.push('/login');
      window.location.reload();

    } catch (error) {
      console.log(error);
      alert('Error registering user.');
    }
  };

  return (
    <div className="flex flex-row">
      <div className='w-full 2xl:w-2/3 flex flex-col p-5'>
        <div className='grid justify-items-start'>
          <a href="/"><img src={logo} className='-mb-5 h-28 w-28 xl:-mb-3 xl:h-24 xl:w-24' alt="Logo" /> </a>
        </div>
        <br />
        <br />
        <br />
        <div className='login-form flex flex-col justify-center items-center'>
          <h2 className='text-4xl font-bold'>Hey There!</h2>
          <p className='py-2 text-lg'>Sign Up for free</p>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full my-3 gap-y-3'>
            <div className='w-full 2xl:w-4/5 flex flex-row items-center justify-items-center gap-x-4'>
              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className='w-full 2xl:w-4/5  flex flex-row items-center justify-items-center gap-x-4'>
              <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Username*" value={username} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            
            <div className='w-full 2xl:w-4/5  flex flex-row items-center justify-items-center gap-x-4'>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className='w-full 2xl:w-4/5 flex flex-row items-center justify-items-center gap-x-4'>
              <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />

            <button type="submit" disabled={!name ||!username || !email || !password } className='w-full 2xl:w-4/5 bg-fuchsia-600 disabled:bg-neutral-300 text-white disabled:text-neutral-500 p-2.5 rounded-full font-medium text-xl'>Sign Up</button>
          </form>

          <p className='text-md mt-5'>Already have an account <a href="/login" className='text-fuchsia-700 underline decoration-fuchsia-700'>Login</a></p>
        </div>
      </div>
      <div className='hidden 2xl:w-1/3 2xl:flex 2xl:items-center 2xl:justify-center h-screen bg-fuchsia-400'>
        <img src={dummy} />
      </div>
    </div>
  );
};

export default RegisterForm;
