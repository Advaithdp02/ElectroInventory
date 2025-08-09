import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3030/api/auth/login', formData);

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", JSON.stringify(res.data.user.role));

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className='Login-Container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange}
            required 
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange}
            required 
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
