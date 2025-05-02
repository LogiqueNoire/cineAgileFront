import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CinemaAcordion from '../2 componentesAcordionSedesHorarios/CinemaAcordion.jsx';
import Funcion from '../servicios/Funcion.js';
import './MostrarSedesHorarios.css';
import Loading from '../0 componentesGenerales/Loading.jsx';



const MostrarSedesHorarios = ({ estado, fechaFormateada, estado2 }) => {
    const { consultaIdPelicula, nombrePelicula, imagenPeli, catePeli, director } = estado
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    cosnt [catePeli, director, sinopsis] = estado2;

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
            setLoading(true)
            setError(null)
        };
    }, [consultaIdPelicula, fechaFormateada]);

    if (error) {
        return <div className='w-100 d-flex justify-content-center'>
            <div className='alert alert-danger h-25 w-50 text-center justify-self-center'>No se pudo cargar las funciones... Intenta recargar la página!</div>
        </div>
    }

    if (loading) {
        return <div className='w-100 d-flex justify-content-center'>
            <Loading />
        </div> 
    }

    if (!consultaIdPelicula) {
        return <p>No se encontró el id de la película.</p>;
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



