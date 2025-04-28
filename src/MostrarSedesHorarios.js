import React from 'react';
import { useState } from 'react';
import CinemaCard from './CinemaCard.jsx';
import Screening from './Screening.jsx';

const MostrarSedesHorarios = ({pelicula, sedes}) => {
    return (
        <div className="App p-4">
            <div className="justify-content-center">
                <h2>{pelicula.nombre}</h2>
                {Object.keys(sedes).map((key) => {
                    if (sedes[key].nombreSede === sedes.nombreSede) {
                        return <CinemaCard key={key} sede={sedes[key].nombreSede} funciones={sedes[key].funciones}></CinemaCard>
                    }
                })}
            </div>
        </div>
    );
}

export default MostrarSedesHorarios;
