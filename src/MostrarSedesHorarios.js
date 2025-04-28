import React from 'react';
import { useLocation } from 'react-router'
import CinemaCard from './CinemaCard.jsx';

const MostrarSedesHorarios = () => {
    const location = useLocation(); // Obtener el estado de la ubicación
    const { pelicula } = location.state || {}; // Acceder a la película desde el estado

    if (!pelicula) {
        return <p>Pelicula no encontrada.</p>;
    }

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
