import React from 'react';

const FilmCard = ({ pelicula }) => {
    return (
        <div className="card m-2 w-100" key={pelicula.id}>
            <img src={require(pelicula.imagen)} alt={pelicula.titulo} className='w-100'/>
            <div className="">
                <h5 className="">{pelicula.titulo}</h5>
                <p className="">{pelicula.descripcion}</p>
            </div>
        </div>
)};

export default FilmCard;