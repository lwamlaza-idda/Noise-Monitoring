import React from 'react';
import './TopNav.css';

const TopNav = () => {
  return (
    <div className="topnav">
      <div className="topnav-content">
        <div className="topnav-left">
          <button className="menu-toggle">
            <span className="menu-icon">☰</span>
          </button>
        </div>
        <div className="topnav-right">
          <div className="user-info">
            <span className="user-name">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav; 