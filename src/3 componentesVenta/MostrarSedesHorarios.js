import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CinemaAcordion from '../2 componentesAcordionSedesHorarios/CinemaAcordion.jsx';
import Funcion from '../servicios/Funcion.js';
import './MostrarSedesHorarios.css';



const MostrarSedesHorarios = ({ estado, fechaFormateada }) => {
    const { consultaIdPelicula, nombrePelicula, imagenPeli } = estado
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('hello')

    useEffect(() => {
        if (!consultaIdPelicula) {
            console.warn("No se recibió un id de película válido.");
            return;
        }

        window.scrollTo({ top: 0 });
        let isMounted = true;

        const obtenerFunciones = async () => {
            try {
                const funciones = await Funcion.mostrarSedesFuncionesPorPelicula(consultaIdPelicula, fechaFormateada, nombrePelicula);
                console.log("Funciones", funciones);

                const agrupadasPorSede = funciones.reduce((acc, funcion) => {
                    let sede = acc.find(s => s.idSede === funcion.idSede);
                    if (!sede) {
                        sede = {
                            idSede: funcion.idSede,
                            nombreSede: funcion.nombreSede,
                            funciones: []
                        };
                        acc.push(sede);
                    }
                    sede.funciones.push(funcion);
                    return acc;
                }, []);

                if (isMounted) {
                    setSedes(agrupadasPorSede);
                    setLoading(false);
                }
            } catch (err) {

                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            }
        };

        obtenerFunciones();

        return () => {
            isMounted = false;
        };
    }, [consultaIdPelicula, fechaFormateada]);

    if (!consultaIdPelicula) {
        return <p>No se encontró el id de la película.</p>;
    }

    if (loading) {
        return <p>Cargando funciones...</p>;
    }

    if (sedes.length === 0) {
        return <p>No se encontraron funciones disponibles.</p>;
    }

    return (
        <div className="App p-4">
            <div className="justify-content-center">
                {sedes.map((sede) => (
                    <CinemaAcordion data={sede} idPelicula={consultaIdPelicula} nombrePelicula={nombrePelicula} imagenPeli={imagenPeli} />
                ))}
            </div>
        </div>
    );
};

export default MostrarSedesHorarios;



