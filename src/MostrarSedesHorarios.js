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
                    if (sedes[key].sede === sede.sede) {
                        return <CinemaCard key={key} sede={sedes[key].sede} funciones={sedes[key].funciones}></CinemaCard>
                    }
                })}
            </div>
        </div>
    );
}

export default MostrarSedesHorarios;
