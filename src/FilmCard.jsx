import React from 'react';
const FilmCard = ({ pelicula }) => {
    return (
        
        <div className="m-2 w-100" key={pelicula.id}>
            <img src={pelicula.imagen} alt={pelicula.nombre} className='w-100'/>
            <div className="">
                <h5 className="">{pelicula.nombre}</h5>
                <p className="">{pelicula.sinopsis}</p>
            </div>
        </div>
)};

export default FilmCard;