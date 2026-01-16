import React from 'react';
import './filmCard.css';
import { useNavigate } from 'react-router-dom';


const FilmCard = ({ pelicula }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/funcion/pelicula/`, { state: { consultaIdPelicula: pelicula.idPelicula, nombrePelicula: pelicula.nombre, imagenPeli: pelicula.imageUrl, sinopsis: pelicula.sinopsis} });
    };

    return (
        <button className="overflow-hidden filmcard-hover card col-8 col-sm-5 col-md-3 col-lg-2 p-1" onClick={handleClick} key={pelicula.id} type="button">
            <img src={pelicula.imageUrl} alt={pelicula.nombre} className='h-100 rounded img-fluid img-film-card2' />
            <div className='text-truncate fw-bold fs-6 text-secondary' >{pelicula.nombre}</div>
        </button>
    );
};

export default FilmCard;