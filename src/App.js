import React, { useState } from "react";
import { Outlet } from "react-router";


import Header from './0 componentesGenerales/Header'
import Footer from './0 componentesGenerales/Footer'
import ScriptGenerarQR from "./servicios/ScriptGenerarQR.js"; // esta es la clase

import "./App.css"


function App() {
    const generador = new ScriptGenerarQR(); // instancia de la clase
  
    return (<>
        <Header>
            
            {/*
            <a href="#pelis">Pelis</a>
            <a href="#cines">Cines</a>
            <a href="#blog">Blog</a>
            */}
        </Header>

        { /* Muestra el contenido de las rutas hijas, como el componente Inicio */ }
        <div className="contenedor container-fluid">
            <Outlet />
        </div>
    
    
        <Footer>
        </Footer>
    </>
        
    );
}
export default App;
