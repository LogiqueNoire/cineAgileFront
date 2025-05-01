import React from 'react';
import './ScreeningButton.css';
import { useNavigate } from 'react-router';
import Funcion from '../servicios/Funcion.js';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

const ScreeningButton = ({ funcion }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // Cambiar la ruta
        //navigate(`/pelicula/${pelicula.idPelicula}/${funcion.idFuncion}`, { state: { consultaSedesPorPelicula: ejemplo } });
    };

    return (
        <div className='w-auto'>
            <button className="btn btn-outline-primary" onClick={handleClick} key={funcion.idFuncion} type='button'>{funcion.fechaHoraInicio}</button>
        </div>
    );
}

export default ScreeningButton;