import React from 'react';
import './FilmCard.css';
import { useNavigate } from 'react-router';


const FilmCard = ({ pelicula }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        // Cambiar la ruta
        //console.log("Pelicula seleccionada:", pelicula);
        navigate(`/funcion/pelicula/`, { state: { consultaIdPelicula: pelicula.idPelicula, nombrePelicula: pelicula.nombre, imagenPeli: pelicula.imageUrl, sinopsis: pelicula.sinopsis} });
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