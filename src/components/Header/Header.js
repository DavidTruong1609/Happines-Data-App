// src/components/Header/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Happiness Data App</Link>
        </div>
        <nav className="nav">
          <ul className="nav-list left-nav">
            <li className="nav-item">
              <Link to="/rankings">Rankings</Link>
            </li>
            <li className="nav-item">
              <Link to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link to="/factors">Factors</Link>
            </li>
          </ul>
          <ul className="nav-list right-nav">
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
