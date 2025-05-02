import React from 'react';
import './ScreeningButton.css';
import { useNavigate } from 'react-router';
import Funcion from '../servicios/Funcion.js';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

const ScreeningButton = ({ funcion, idPelicula, nombrePelicula, imagenPeli, catePeli , director, sinopsis }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // Cambiar la ruta
        //navigate(`/pelicula/${pelicula.idPelicula}/${funcion.idFuncion}`, { state: { consultaSedesPorPelicula: ejemplo } });
        navigate(`/compra`, { state: { funcion, idPelicula, nombrePelicula, imagenPeli, catePeli, director, sinopsis } })
        console.log(funcion)
    };

    return (
        
        <div className='w-auto'>
            <button className="btn btn-outline-primary" onClick={handleClick} key={funcion.idFuncion} type='button'>{funcion.fechaHoraInicio.slice(11, 16)}</button>
        </div>
    );
}

export default ScreeningButton;