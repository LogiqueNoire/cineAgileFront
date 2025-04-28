import React, { useState } from "react";
import data2 from './ejemploP.json'
import FilmTab from './FilmTab.jsx';
import ComJose1 from './ComJose1.jsx';
import ComponenteVerde from "./componenteVerde.jsx";

function App() {
    return (
        <div className="App p-4">
            <ComponenteVerde></ComponenteVerde>
            <FilmTab estado="En cartelera" peliculas={data2} />

            <ComJose1></ComJose1>
        </div>
    );
}
export default App;