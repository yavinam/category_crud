import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    
        <div className="text-xl font-bold tracking-wide hover:scale-105 transition-transform">
          <NavLink to="/" className="hover:text-blue-200">
            MyWebsite
          </NavLink>
        </div>

       
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? 'underline text-blue-200' : 'hover:text-blue-300'
              } transition-colors`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? 'underline text-blue-200' : 'hover:text-blue-300'
              } transition-colors`
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? 'underline text-blue-200' : 'hover:text-blue-300'
              } transition-colors`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/showcategories"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? 'underline text-blue-200' : 'hover:text-blue-300'
              } transition-colors`
            }
          >
            Categories
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;