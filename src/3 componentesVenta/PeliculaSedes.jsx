import { useLocation } from "react-router";
import React, { useRef, useState } from "react";
import MostrarSedesHorarios from "./MostrarSedesHorarios";
import { format } from 'date-fns'


const formatearTiempo = (fecha) => {
    if (isNaN(fecha.getTime())) {
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
    const { consultaIdPelicula, nombrePelicula, imagenPeli } = location.state || {};
    // Formatear la fecha en formato 'yyyy-MM-ddTHH:mm'
    const hoy = useRef(new Date());
    const [fecha, setfecha] = useState(hoy.current);

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

    return (<>
        <div className="d-flex justify-content-center align-items-center p-4 bg-light mb-4">
            <div className='infoPelicula me-4'>
                <h2 className='mb-4'>Funciones para película {nombrePelicula}</h2>
                <div>
                    <span className="mx-3">Selecciona una fecha:</span>
                    <input type="date" className="mx-3" min={formatearTiempoSoloFecha(hoy.current)} value={soloFecha} onChange={onFechaChange}/>
                </div>
            </div>
            <img src={imagenPeli} alt="imagen Peli" />
        </div>

        <MostrarSedesHorarios estado={ location.state} fechaFormateada={ formatearTiempo(fecha) } />
    </>);
};

export default PeliculaSedes