import CinemaCard from './CinemaCard.jsx';
import React, { useState } from "react";
import DatePickerComponent from './DatePickerComponent.jsx';
import Componente from './componente.jsx';
import FilmTab from './FilmTab.jsx';
import ComJose1 from './ComJose1.jsx';
import ComJose2 from './ComJose2.jsx';

function App() {
    return (
        <div className="App p-4">
            <FilmTab estado="En cartelera" peliculas={peliculas} />
           
            <ComJose1></ComJose1>
        </div>
    );
}
export default App;