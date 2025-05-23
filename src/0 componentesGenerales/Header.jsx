import React from 'react';
import "./Header.css"
import {useNavigate } from 'react-router-dom';

const Header = ({ children }) => {
  const navigate = useNavigate();

  return (
    <header className="header shadow">
      <a href="/" className='text-decoration-none'>
        <h1>Cine Agile</h1>
      </a>

      <nav className="nav-links">
        {children}
      </nav>
      <div className="icons">
        <button className="icon-button" onClick={(e) => {e.preventDefault(); navigate(`/intranet`)}}>
          <img src="../../intranet.png" alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header