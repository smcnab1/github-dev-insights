// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white text-center py-3">
      <div className="container">
        <h1>GitHub Insights</h1>
        <p className="lead">Your GitHub analytics at a glance</p>
        <nav>
          <Link to="/" className="text-white mx-2">Home</Link>
          <Link to="/repos" className="text-white mx-2">Repositories</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
