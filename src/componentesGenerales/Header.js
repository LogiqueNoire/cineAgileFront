import React from 'react';

import "./Header.css"

export const Header = () => {
  return (
    <header className="header">
      <h1>Cine Agile</h1> 
      <nav className="nav-links">
        <a href="#pelis">Pelis</a>
        <a href="#cines">Cines</a>
        <a href="#blog">Blog</a>
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

export default Header;