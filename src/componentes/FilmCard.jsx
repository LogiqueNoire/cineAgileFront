import React from 'react';
import './FilmCard.css';
import { useNavigate } from 'react-router-dom'; // Necesario para navegar entre rutas

const FilmCard = ({ pelicula }) => {
    const handleClick = () => {
        // Cambiar la ruta
        window.location.href = '/MostrarSedesHorarios'; // Redirige a la nueva ruta
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


/*
        // Realizar una consulta utilizando Fetch (puedes usar otros métodos como AJAX si prefieres)
        const params = { clave: 'valor', otroParametro: 123 }; // Parámetros a enviar
        fetch('https://miapi.com/endpoint', {
            method: 'GET', // o 'POST', según necesites
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params), // Solo si usas 'POST' o si necesitas enviar un cuerpo
        })
        .then(response => response.json()) // O cualquier tipo de respuesta que se espere
        .then(data => {
            console.log('Consulta exitosa:', data);
        })
        .catch(error => {
            console.error('Error al realizar la consulta:', error);
        });*/