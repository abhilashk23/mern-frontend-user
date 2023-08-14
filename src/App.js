import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import User from './pages/User';
import './App.css';
import HomePage from './pages/Home';
import UpdatePF from './components/UpdatePF/UpdatePF';

function App() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:5000/users/verifyToken', { token })
        .then(response => {
          setUser(response.data);
          setProfileImage(response.data.profileImage);
        })
        .catch(error => {
          console.error('Token verification failed:', error);
        });
    }
  }, []);

  const handleLogin = () => {
    setUser(user);
  };

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
            <LoginForm onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/home/:username" exact>
          {user ? (
            <User user={user} /> // Render the component for the home page
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/update" exact>
          <UpdatePF />
        </Route>
      </div>
    </Router>
  );
}

export default App;
