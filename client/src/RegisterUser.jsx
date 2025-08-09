import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff' // default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:3030/api/auth/register', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('User registered successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div className="form-container">
      <h2>Register New User</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button className='submit' type="submit">Register User</button>
      </form>
    </div>
  );
}

export default RegisterUser;
