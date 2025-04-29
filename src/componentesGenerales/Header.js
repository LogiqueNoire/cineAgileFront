import React from 'react';

import "./Header.css"

const Header = ({ children }) => {
  return (
    <header className="header">
      <h1>Cine Agile</h1> 
      <nav className="nav-links">
        { children }
      </nav>
      <div className="icons">
        <button className="icon-button">
          <img src="/Icono-Usuario.png" alt="Usuario" />
        </button>
        <button className="icon-button">
          <img src="Ayuda.png" alt="Ayuda" />
        </button>
      </div>
    </header>
  );
};

export default Header