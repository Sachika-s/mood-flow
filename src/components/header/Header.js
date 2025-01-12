import React from 'react';
import { NavLink } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-[#87CEEB] bg-opacity-55 rounded-xl shadow top-0 z-10">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img src="logo.webp" alt="Mood Flow Logo" className="h-12 w-12" />
        <h1 className="text-2xl font-bold text-gray-800">Mood Flow</h1>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6">
        <NavLink
          exact
          to="/"
          activeClassName="text-blue-500 font-bold"
          className="text-gray-700 font-semibold hover:text-gray-900"
        >
          Home
        </NavLink>
        <NavLink
          to="/calendar"
          activeClassName="text-blue-500 font-semibold"
          className="text-gray-700 font-semibold hover:text-gray-900"
        >
          Calendar
        </NavLink>
        <NavLink
          to="/about"
          activeClassName="text-blue-500 font-semibold"
          className="text-gray-700 font-semibold hover:text-gray-900"
        >
          About
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
