import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import User from './pages/User';
import './App.css';
import HomePage from './pages/Home';
import UpdatePF from './components/UpdatePF/UpdatePF';
import LinkUpdate from './components/LinkUpdate/LinkUpdate';
import BgUpdate from './components/BgUpdate/BgUpdate';
import DelLink from './components/DelLink/DelLink';
// import SearchUser from './components/SearchUser/SearchUser';
import PasswordUpdate from './components/PasswordUpdate/PasswordUpdate';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function App() {
  const [user, setUser] = useState(null);
  // const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('https://user-login-api.onrender.com/users/verifyToken', { token })
        .then((response) => response.data)
        .then(data => setTimeout(() => {
          setUser(data);
          // setProfileImage(data.profileImage);
        }), 1000)
        .catch(error => {
          console.error('Token verification failed:', error);
        });
    }
  }, []);

  // const handleLogin = () => {
  //   setUser(user);
  // };

  return (
    <Router>
      <div>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/register" exact>
          <RegisterForm />
        </Route>
        <Route path="/login" exact>
          {user ? (
            <Redirect to={`/home/${user.username}`} />
          ) : (
            <LoginForm  />
          )}
        </Route>
        <Route path="/home/:username" exact>
          {user ? (
            <User user={user} /> // Render the component for the home page
          ) : (
            <div className='mt-5 flex flex-row gap-x-5 items-center justify-items-center'>
              <Stack spacing={1}>
                <div className='flex flex-row justify-items-center items-center gap-x-5'>
                  <Skeleton variant="circular" width={100} height={100} />
                  <div className='flex flex-col'>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={210} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={210} />
                    <div className='my-2 flex flex-row gap-x-3'>
                      <Skeleton variant="rounded" width={30} height={30} />
                      <Skeleton variant="rounded" width={30} height={30} />
                      <Skeleton variant="rounded" width={30} height={30} />
                      <Skeleton variant="rounded" width={30} height={30} />
                      <Skeleton variant="rounded" width={30} height={30} />
                    </div>
                  </div>
                </div>
                <Skeleton variant="rounded" width={500} height={30} />
                <Skeleton variant="rounded" width={500} height={30} />
              </Stack>
            </div>
          )}
        </Route>
        <Route path="/update" exact>
          <UpdatePF />
        </Route>
        <Route path="/addlinks" exact>
          <LinkUpdate />
        </Route>
        <Route path="/addbg" exact>
          <BgUpdate />
        </Route>
        <Route path="/dellink" exact>
          <DelLink user={user} />
        </Route>
        <Route path="/passwordupdate" exact>
          <PasswordUpdate />
        </Route>
      </div>
    </Router>
  );
}

export default App;
