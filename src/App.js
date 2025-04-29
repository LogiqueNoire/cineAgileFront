import React, { useState } from "react";
import data2 from './ejemploPeliculasVarias.json'
import FilmTab from './componentesCartelera/FilmContainer.jsx';
import ComJose1 from './precios/ComJose1.jsx';

import Header from './componentesGenerales/Header'
import { Outlet } from "react-router";

function App() {
    return (<>
        <Header>
            <a href="#pelis">Pelis</a>
            <a href="#cines">Cines</a>
            <a href="#blog">Blog</a>
        </Header>

        <Outlet />
    
        <div className="App p-4">
            <ComJose1></ComJose1>
        </div>
    
    </>
        
    );
}
export default App;