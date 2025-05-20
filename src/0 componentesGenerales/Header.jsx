import React from 'react';
import "./Header.css"

const Header = ({ children }) => {
  return (
    <header className="header shadow">
      <a href="/" className='text-decoration-none'>
        <h1>Cine Agile</h1>
      </a>

      <nav className="nav-links">
        {children}
      </nav>
      <div className="icons">
        <button className="icon-button">
          <img src="../../intranet.png" alt="Usuario" />
        </button>
        <button className="icon-button">
          <img src="Ayuda.png" alt="Ayuda" />
        </button>
      </div>
    </header>
  );
};

export default Header