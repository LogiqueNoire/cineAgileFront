import React, { useMemo } from 'react';
import { useLocation } from 'react-router'
import CinemaAcordion from './componentesAcordionSedesHorarios/CinemaAcordion.jsx';

const MostrarSedesHorarios = () => {
    const location = useLocation(); // Obtener el estado de la ubicación

    // Scrollea hacia arriba
    const _ = useMemo(() => { window.scrollTo({ top: true }) }, [ location ])

    const { consultaSedesPorPelicula } = location.state || {}; // Acceder a la película desde el estado
    console.log(consultaSedesPorPelicula);

    if (!consultaSedesPorPelicula) {
        return <p>Pelicula no encontrada.</p>;
    }

    const sedes = consultaSedesPorPelicula.sedes;
    console.log("Sedes");
    console.log(sedes);
    return (
        <div className="App p-4">
            <div className="justify-content-center">
                <h2>{consultaSedesPorPelicula.nombre}</h2>
                {sedes.map((sede) => (
                    <CinemaAcordion
                        key={sede.idSede}
                        sede={sede.nombreSede}
                        funciones={sede.funciones}
                    />
                ))}
            </div>
        </div>
    );
}

export default MostrarSedesHorarios;
