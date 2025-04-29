import React, { useState } from "react";
import { Outlet } from "react-router";

import ComJose1 from './precios/ComJose1.jsx';
import Header from './componentesGenerales/Header'
import Footer from './componentesGenerales/Footer'

import "./App.css"

function App() {
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
    
        <div className="App p-4">
            <ComJose1></ComJose1>
        </div>
    
        <Footer />
    </>
        
    );
}
export default App;