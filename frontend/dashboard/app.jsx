import React, { useState } from 'react';
import './index.css';

function App() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleMenuClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      alert('You have been logged out successfully!');
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="menu-container">
          <div className="menu-title">Navigation</div>
          {['Dashboard', 'Profile', 'ID Card', 'Attendance'].map((item) => (
            <div
              key={item}
              className={`menu-item ${activeItem === item ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        <div className="header">
          <div className="image-container">
            <img src="/hyperloopin_logo.png" alt="HyperLoopin Logo" />
          </div>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        <div className="main-content">
          <div className="content-item">
            Welcome to The HyperLoopin Club Dashboard
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
