import React, { useContext, useEffect, useState } from 'react';
import AddFilm from './AddFilm';
import './VentanaPeliculas.css'
import axios from 'axios';
import { url } from "../../configuracion/backend"

const VentanaPeliculas = () => {
    const [lista, setLista] = useState([]);

    const consultar = async () => {
        try {
            setLista((await axios.get(`${url}/intranet/peliculas`)).data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        consultar()
    }, [])

    useEffect(() => {
        console.log(lista)
    }, [lista])

    return (
        <div>
            <div className='d-block'>
                <AddFilm></AddFilm>

                <table className='table table-striped border table-hover mt-4'>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td>Duración (min)</td>
                            <td style={{width: "400px"}}>Sinopsis</td>
                            <td>Género</td>
                            <td>Director</td>
                            <td>Clasificación</td>
                            <td>Estado</td>
                            <td>Actores</td>
                            <td>Inicio de preventa</td>
                            <td>Inicio de estreno</td>
                            <td>Imagen</td>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((el, id) => (

                            <tr key={id}>
                                <td data-label='Nombre'>{el.nombre}</td>
                                <td data-label='Duración'>{el.duracion}</td>
                                <td data-label='Sinopsis'><div className='sinopsis'>{el.sinopsis}</div></td>
                                <td data-label='Género'>{el.genero === " " ? "-" : el.genero}</td>
                                <td data-label='Director'>{el.director === " " ? "-" : el.director}</td>
                                <td data-label='Clasificación'>{el.clasificacion === " " ? "-" : el.clasificacion}</td>
                                <td data-label='Estado'>{el.estado}</td>
                                <td data-label='Actores'>{el.actores === " " ? "-" : el.actores}</td>
                                <td data-label='Inicio de preventa'>{el.fechaInicioPreventa}</td>
                                <td data-label='Inicio de estreno'>{el.fechaInicioEstreno}</td>
                                <td data-label='Imagen'>
                                    <a href={el.imageUrl} target="_blank" rel="noopener noreferrer">
                                        Enlace
                                    </a>

                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default VentanaPeliculas;