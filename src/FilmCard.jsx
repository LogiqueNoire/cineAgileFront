import React from 'react';
import './FilmCard.css';

const FilmCard = ({ pelicula }) => {
    return (
        
        <button className="m-2 border-0" key={pelicula.id} type="button">
            <img src={pelicula.imagen} alt={pelicula.nombre} className='img-film-card'/>
            <div className="">
                <h5 className="">{pelicula.nombre}</h5>
                <p className="">{pelicula.sinopsis}</p>
            </div>
        </button>
)};

export default FilmCard;