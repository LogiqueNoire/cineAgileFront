import React, { useState } from "react";
import data from './ejemplo.json'
import data2 from './ejemploP.json'
import FilmTab from './FilmTab.jsx';
import ComJose1 from './ComJose1.jsx';

function App() {
    return (
        <div className="App p-4">
            <FilmTab estado="En cartelera" peliculas={data2} />
           
            <ComJose1></ComJose1>
        </div>
    );
}
export default App;