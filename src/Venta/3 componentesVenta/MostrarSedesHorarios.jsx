import React, { useState, useEffect } from 'react';
import CinemaAcordion from '@/Venta/2 componentesAcordionSedesHorarios/CinemaAcordion.jsx';
import Funcion from '@/services/Funcion.js';
import './MostrarSedesHorarios.css';
import Loading from '@/components/Loading/Loading.jsx';
import Toast from '@/components/Toast/Toast.jsx';
import { differenceInCalendarDays, format, isSameDay } from 'date-fns';
import { env } from '@/configuracion/backend.js';
import TimeService from '@/services/TimeService';

const MostrarSedesHorarios = ({ pelicula, fechaFormateada }) => {
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [toast, setToast] = useState({ visible: false });
    const [fechaReal, setFechaReal] = useState();

    useEffect(() => {
        const obtenerFecha = async () => {
            const data = await TimeService.obtenerFecha();
            setFechaReal(data);
        };
        obtenerFecha();
        setToast({ visible: true });
        setTimeout(() => setToast({ visible: false }), 3000);
    }, [])

    useEffect(() => {
        window.scrollTo({ top: 0 });
        let isMounted = true;

        const obtenerFunciones = async () => {
            try {
                const fechaAComparar = isSameDay(new Date(fechaFormateada), fechaReal)
                    ? format(fechaReal, `yyyy-MM-dd.HH:mm`).replace('.', 'T') : fechaFormateada
                const funciones = await Funcion.mostrarSedesFuncionesPorPelicula(pelicula.idPelicula, fechaAComparar);
                env === "dev" && console.log("funciones y fecha a comparar ", funciones, fechaAComparar)
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
                console.error(err)
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            }
        };

        obtenerFunciones();
        env === "dev" && console.log(pelicula);
        return () => {
            isMounted = false;
        };
    }, [pelicula, fechaFormateada, fechaReal]);

    if (loading || !fechaReal)
        return <div className='w-100 d-flex justify-content-center'>
            <Loading />
        </div>

    if (error) {
        return <div className='w-100 d-flex justify-content-center'>
            <div className='alert alert-danger h-70 w-50 text-center justify-self-center mt-4'>No se pudo cargar las funciones... Intenta recargar la página!</div>
        </div>
    }

    if (!pelicula) {
        return <p className='ancizar-sans-regular mb-0'>No se encontró la película.</p>;
    }

    return (
        (sedes.length === 0 || differenceInCalendarDays(pelicula.fechaInicioEstreno, fechaReal) >= 8
            ?
            (
                <>
                    {env === "dev" && console.log(sedes, pelicula, fechaReal)}
                    <p className='text-center display-6 my-5 px-4 ancizar-sans-regular'>
                        No se encontraron funciones disponibles.
                    </p>
                </>
            )
            :
            <div className="sedes-horarios py-5 my-1">
                <div className="justify-content-center">
                    {sedes.map((sede, i) => (<CinemaAcordion key={sede.idSede} data={sede} pelicula={pelicula} />))}
                </div>
                <Toast tipo={'toast-info'}
                    mensaje={'Ahora puedes ver la cantidad de funciones disponibles con el nuevo botón a lado de cada función'}
                    visible={toast.visible} />
            </div>)
    );
};

export default MostrarSedesHorarios;



