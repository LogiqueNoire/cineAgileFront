import React, { useState, useEffect } from 'react';
import CinemaAcordion from '../2 componentesAcordionSedesHorarios/CinemaAcordion.jsx';
import Funcion from '../servicios/Funcion.js';
import './MostrarSedesHorarios.css';
import Loading from '../0 componentesGenerales/Loading.jsx';
import Toast  from '../Toast.jsx';
import Fecha from '../servicios/Fecha.js';
import { differenceInCalendarDays } from 'date-fns';
import { url } from '../configuracion/backend.js';
import axios from 'axios';

const MostrarSedesHorarios = ({ pelicula, fechaFormateada }) => {
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [toast, setToast] = useState({ visible: false });

    const [fechaReal, setFechaReal] = useState();
    console.log(pelicula);
    const consultarFechaReal = async () =>{
        try {
            setFechaReal((await axios.get(`${url}/api/tiempo/v1`)).data);
        } catch (error) {
            console.log(error)
        } finally {
            console.log(fechaReal)
        }

    }

    const mostrarToast = () => {
        setToast({ visible: true });
        setTimeout(() => setToast({ visible: false }), 3000);
    };

    useEffect(()=>{
        consultarFechaReal()
    }, [])

    useEffect(() => {

        window.scrollTo({ top: 0 });
        let isMounted = true;

        const obtenerFunciones = async () => {
            try {
                const fechaUtc = Fecha.tiempoLocalString_A_UTCString(fechaFormateada);
                console.log("formateada: "  + fechaFormateada + ", utc: " + fechaUtc)
                const funciones = await Funcion.mostrarSedesFuncionesPorPelicula(pelicula.idPelicula, fechaUtc);

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
                    mostrarToast();
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

    console.log("comparar", pelicula.fechaInicioEstreno, fechaReal)
    if (sedes.length === 0 || differenceInCalendarDays(pelicula.fechaInicioEstreno, fechaReal) >= 8) {
        return <p className='text-center display-6 my-5 px-4'>No se encontraron funciones disponibles.</p>;
    }

    return (
        <div className="sedes-horarios py-5 my-1">
            <div className="justify-content-center">
                {sedes.map((sede) => (
                    <CinemaAcordion data={sede} pelicula={pelicula} />
                ))}
            </div>
            <Toast tipo={'toast-info'}
                mensaje={'Ahora puedes ver la cantidad de funciones disponibles con el nuevo botón a lado de cada función'}
                visible={toast.visible} />
        </div>
    );
};

export default MostrarSedesHorarios;



