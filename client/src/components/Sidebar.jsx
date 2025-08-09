import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';


function Sidebar({ onSelectType }) {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const role = localStorage.getItem("role"); // check role for admin access

  useEffect(() => {
    axios.get('http://localhost:3030/api/items/types')
      .then(res => setTypes(res.data))
      .catch(err => console.error('Error fetching types:', err));
  }, []);

  return (
    <div className="sidebar">
      {role === "admin" && ( // lowercase to match your backend stored role
        <>
          <Link to="/register">
            <button>Register User</button>
          </Link>
          <Link to="/addItem">
            <button>Add Items</button>
          </Link>
        </>
      )}
      {types.map((type, idx) => (
        <button key={idx} onClick={() => onSelectType(type)}>
          {type}
        </button>
      ))}
    <button onClick={() => navigate('/addItem')}>Add Items</button>
      <button onClick={() => navigate('/register')}>Add Users</button>
      <button onClick={()=>{localStorage.clear(); navigate('/login')}}>Logout</button>
    </div>
  );
}

export default Sidebar;
