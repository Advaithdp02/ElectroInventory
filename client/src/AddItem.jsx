import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    price: ''
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
    const dataToSend = {
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      category:"Elctronics"
    };
    await axios.post('http://localhost:3030/api/items', dataToSend, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setSuccess('Item added successfully!');
    setTimeout(() => navigate('/dashboard'), 1500);
  } catch (err) {
    setError(err.response?.data?.message || 'Error adding item');
  }
};


  return (
    <div className="form-container">
      <h2>Add New Item</h2>
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
          Type:
          <input 
            type="text" 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Quantity:
          <input 
            type="number" 
            name="quantity" 
            value={formData.quantity} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Price:
          <input 
            type="number" 
            name="price" 
            step="0.01"
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </label>
        <button className="submit"type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
