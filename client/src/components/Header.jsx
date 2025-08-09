import React from 'react';
import '../styles/Header.css'; // Import your CSS file

function Header() {
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const { name, role } = userData;

  return (
    <header className="header">
      <h1 className="site-name">ElectroInventory</h1>
      {name && role ? (
        <div className="user-info">
          Welcome, <strong>{name}</strong> ({role})
        </div>
      ) : (
        <div className="user-info">Not logged in</div>
      )}
    </header>
  );
}

export default Header;
