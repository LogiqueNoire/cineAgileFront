import React from 'react';
import "./Header.css"
import { useNavigate } from 'react-router-dom';

const Header = ({ children }) => {
  const navigate = useNavigate();

  return (
    <header className="header shadow">
      <div className='d-flex justify-content-between me-2 align-items-center'>

        <a href="/" className='text-decoration-none'>
          <h1 className='saira-semibold fw-bold'>cineagile</h1>
        </a>


        <div className="icons">
          <button className="icon-button" onClick={(e) => { e.preventDefault(); navigate(`/intranet`) }}>
            <img src="../../intranet.png" alt="" />
          </button>
        </div>
      </div>
      <nav className="nav-links">
        {children}
      </nav>
    </header>
  );
};

export default Header