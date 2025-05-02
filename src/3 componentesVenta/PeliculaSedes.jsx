import { useLocation } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import MostrarSedesHorarios from "./MostrarSedesHorarios";
import { format } from 'date-fns'
import Pelicula from "../servicios/Pelicula";
import Loading from "../0 componentesGenerales/Loading";

const formatearTiempo = (fecha) => {
    if (isNaN(fecha)) {
        return format(new Date(), `yyyy-MM-dd.HH:mm`).replace('.', 'T')
    } else {
        return format(fecha, `yyyy-MM-dd.HH:mm`).replace('.', 'T')
    }

}

const formatearTiempoSoloFecha = (fecha) => {
    return formatearTiempo(fecha).split('T')[0]
}

const PeliculaSedes = () => {
    const location = useLocation();
    const { consultaIdPelicula, nombrePelicula, imagenPeli, sinopsis } = location.state || {};

    // Formatear la fecha en formato 'yyyy-MM-ddTHH:mm'
    const hoy = useRef(new Date());
    const [fecha, setfecha] = useState(hoy.current);

    const [ pelicula, setPelicula ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        Pelicula.mostrarPelicula(consultaIdPelicula).then(data => {
            setPelicula(data)
        }).catch(err => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })

        return () => {
            setError(null)
            setLoading(true)
        }
    }, [ consultaIdPelicula ])

    const onFechaChange = (e) => {
        const fechaActual = new Date()

        if (formatearTiempoSoloFecha(fechaActual) == e.target.value) {
            setfecha(formatearTiempo(fechaActual));
            return;
        }

        const fechaACambiar = new Date(`${e.target.value}T00:00`);
        setfecha(fechaACambiar);
    }

    const soloFecha = formatearTiempoSoloFecha(fecha);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <h1>error</h1>
    }

    return (<div>
        <div className="d-flex justify-content-center gap-4 align-items-center px-5 py-4 bg-light bg-gradient border shadow mb-4">
            <img className="shadow rounded" src={pelicula.imageUrl} alt="imagen Peli" />
            <div>
                <h1 className="display-4"> { pelicula.nombre }</h1>
                <p> { pelicula.sinopsis }</p>
                
                <div className='mt-5'>
                    <h5 className='my-2'>Opciones</h5>
                    <div>
                        <span className="me-2">Selecciona una fecha:</span>
                        <input type="date" className="mx-1" min={formatearTiempoSoloFecha(hoy.current)} value={soloFecha} onChange={onFechaChange}/>
                    </div>
                </div>

            </div>
            <img src={imagenPeli} alt="imagen Peli" />
        </div>

        <MostrarSedesHorarios pelicula={ pelicula } fechaFormateada={ formatearTiempo(fecha) } />
    </div>);
};

export default PeliculaSedes