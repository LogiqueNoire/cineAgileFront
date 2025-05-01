import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CinemaAcordion from './2 componentesAcordionSedesHorarios/CinemaAcordion.jsx';
import Funcion from './servicios/Funcion.jsx';

const MostrarSedesHorarios = () => {
    const location = useLocation();
    const { consultaIdPelicula } = location.state || {};
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!consultaIdPelicula) {
            console.warn("No se recibió un id de película válido.");
            return;
        }

        window.scrollTo({ top: 0 });
        let isMounted = true;

        
        const now = new Date();
        // Formatear la fecha en formato 'yyyy-MM-ddTHH:mm'
        let fechaFormateada = now.toISOString().slice(0, 19); // '2023-10-05T12:00'
        
        const obtenerFunciones = async () => {
            try {
                const funciones = await Funcion.mostrarSedesFuncionesPorPelicula(consultaIdPelicula, fechaFormateada, );
                console.log(funciones);

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
    }, [consultaIdPelicula]);

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
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Funciones para película {consultaIdPelicula}</h2>
                    <div>
                        <h5 className="mx-3">Seleccionar Fecha</h5>
                        <input type="date" className="mx-3" />
                    </div>
                </div>

                {sedes.map((sede) => (
                    <CinemaAcordion data={sede} />
                ))}
            </div>
        </div>
    );
};

export default MostrarSedesHorarios;



