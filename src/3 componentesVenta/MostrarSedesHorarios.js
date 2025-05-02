import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CinemaAcordion from '../2 componentesAcordionSedesHorarios/CinemaAcordion.jsx';
import Funcion from '../servicios/Funcion.js';
import './MostrarSedesHorarios.css';
import Loading from '../0 componentesGenerales/Loading.jsx';

const MostrarSedesHorarios = ({ pelicula, fechaFormateada }) => {
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        window.scrollTo({ top: 0 });
        let isMounted = true;

        const obtenerFunciones = async () => {
            try {
                const funciones = await Funcion.mostrarSedesFuncionesPorPelicula(pelicula.idPelicula, fechaFormateada);

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
    }, [pelicula, fechaFormateada]);

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

    if (!pelicula) {
        return <p>No se encontró la película.</p>;
    }


    if (sedes.length === 0) {
        return <p className='text-center display-6 my-5'>No se encontraron funciones disponibles.</p>;
    }

    return (
        <div className="sedes-horarios mx-5 p-5 my-1 border shadow">
            <h1 className='display-5 text-center mb-5 round'>Sedes</h1>
            <div className="justify-content-center">
                {sedes.map((sede) => (
                    <CinemaAcordion data={sede} pelicula={pelicula} />
                ))}
            </div>
        </div>
    );
};

export default MostrarSedesHorarios;



