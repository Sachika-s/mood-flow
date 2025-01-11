// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Header.css';

const Header = () => {
  return (
    <div className="topnav">
      <Link className="active" to="/">Home</Link>  {/* Use 'to' instead of 'href' */}
      <Link to="/calendar">Calendar</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Header;
