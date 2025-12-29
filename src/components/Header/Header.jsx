import React from 'react';
import "./Header.css"
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={`header ${location.pathname == '/intranet/login' ? "shadow-black" : "shadow-gray"}`}>
      <div className='d-flex justify-content-between me-2 align-items-center'>

        <a href="/" className='text-decoration-none'>
          <h1 className='saira-semibold fw-bold mb-0'>cineagile</h1>
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