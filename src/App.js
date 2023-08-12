import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/Home/Home';
import './App.css';

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
    <div className="App">
      <Router>
        <Route path="/" exact>
          {user ? (
            <Redirect to="/home" />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/home" exact>
          {user ? (
            <Home user={user} /> // Render the component for the home page
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
