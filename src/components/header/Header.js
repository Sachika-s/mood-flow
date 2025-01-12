// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';  // Import Link from react-router-dom
import './Header.css';

const Header = () => {
    return (
    <div className="topnav">
        <h1>Mood Flow</h1>
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/calendar" activeClassName="active">Calendar</NavLink>
        <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        <NavLink to="/about" activeClassName="active">About</NavLink>
    </div>
    );
  };
  
  export default Header;
