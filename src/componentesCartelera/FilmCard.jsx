import React from 'react';
import './FilmCard.css';
import { useNavigate } from 'react-router';

//para probar, se importa un json de ejemplo
import ejemplo from "../ejemploFuncionesPelicula.json";

const FilmCard = ({ pelicula }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        // Cambiar la ruta
        navigate(`/pelicula/${pelicula.idPelicula}`, { state: { consultaSedesPorPelicula: ejemplo } });
    };

    return (
        <button className="filmCard m-2 border-0" onClick={handleClick} key={pelicula.id} type="button">
            <img src={pelicula.imageUrl} alt={pelicula.nombre} className='img-film-card' />
            <div>
                <h5>{pelicula.nombre}</h5>
            </div>
        </button>
    );
};

export default FilmCard;