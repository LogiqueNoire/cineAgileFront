import React, { useContext, useEffect, useState } from 'react';
import AddFilm from './AddFilm';
import './VentanaPeliculas.css'
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Loading from '../../0 componentesGenerales/Loading';

const VentanaPeliculas = () => {
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);

    const consultar = async () => {
        try {
            setLista((await axios.get(`${url}/intranet/peliculas`)).data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
                <AddFilm onSucess={consultar}></AddFilm>

                {loading === true
                    ? <div className='d-flex flex-column align-items-center container'><Loading></Loading></div> :
                    <table className='table mytable table-striped border table-hover mt-4'>
                        <thead className='thead'>
                            <tr>
                                <td className='td'>Nombre</td>
                                <td className='td'>Duración (min)</td>
                                <td className='td' style={{ width: "400px" }}>Sinopsis</td>
                                <td className='td'>Género</td>
                                <td className='td'>Director</td>
                                <td className='td'>Clasificación</td>
                                <td className='td'>Estado</td>
                                <td className='td'>Actores</td>
                                <td className='td'>Inicio de estreno</td>
                                <td className='td'>Imagen</td>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {lista.map((el, id) => (

                                <tr className='tr' key={id}>
                                    <td className='td' data-label='Nombre'>{el.nombre}</td>
                                    <td className='td' data-label='Duración'>{el.duracion}</td>
                                    <td className='td' data-label='Sinopsis'><div className='sinopsis'>{el.sinopsis}</div></td>
                                    <td className='td' data-label='Género'>{el.genero === "" || el.genero === " " ? "-" : el.genero}</td>
                                    <td className='td' data-label='Director'>{el.director === "" | el.director === " " ? "-" : el.director}</td>
                                    <td className='td' data-label='Clasificación'>{el.clasificacion === "" | el.clasificacion === " " ? "-" : el.clasificacion}</td>
                                    <td className='td' data-label='Estado'>{el.estado}</td>
                                    <td className='td' data-label='Actores'>{el.actores === "" || el.actores === " " ? "-" : el.actores}</td>
                                    <td className='td' data-label='Inicio de estreno'>{el.fechaInicioEstreno}</td>
                                    <td className='td' data-label='Imagen'>
                                        <a href={el.imageUrl} target="_blank" rel="noopener noreferrer">
                                            Enlace
                                        </a>

                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                }
            </div>
        </div>
    )
}

export default VentanaPeliculas;