import React from 'react';

const FilmCard = ({ pelicula }) => {
    return (
        <div className="card m-2" key={pelicula.id}>
            <img src={pelicula.poster} className="card-img-top" alt={pelicula.titulo} />
            <div className="card-body">
                <h5 className="card-title">{pelicula.titulo}</h5>
                <p className="card-text">{pelicula.descripcion}</p>
            </div>
        </div>
)};

export default FilmCard;