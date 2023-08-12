import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      await axios.post('http://localhost:5000/users/register', formData);
      alert('User registered successfully! Click Ok to go to Login');
      history.push('/login');
      window.location.reload();

    } catch (error) {
      console.log(error);
      alert('Error registering user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
      <button type="submit">Register</button>

      <p>Already Registered? <a href="/login">Login</a></p>
    </form>
  );
};

export default RegisterForm;
