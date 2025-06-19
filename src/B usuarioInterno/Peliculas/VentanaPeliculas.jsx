import React, { useContext, useEffect, useState } from 'react';
import AddFilm from './AddFilm';
import './VentanaPeliculas.css'
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Loading from '../../0 componentesGenerales/Loading';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import iconoEditar from '../../assets/editar.svg'

const ordenamientoFecha = (a, b) => {
    const x = a.fechaInicioEstreno;
    const y = b.fechaInicioEstreno;

    return x < y ? -1 : 1;
}

const VentanaPeliculas = () => {
    const [fechaReal, setFechaReal] = useState()

    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);

    /*manejo de fecha*/
    let response
    useEffect(() => {
        const obtenerFecha = async () => {
            try {
                response = await axios.get(`${url}/fecha-actual`);
                setFechaReal(new Date(response.data));

            } catch (err) {
                console.error("Error al obtener la fecha:", err);
            }
        };

        obtenerFecha();
    }, []);

    useEffect(() => {
        if (fechaReal) {
            /*setFechaElegida(fechaReal)*/
            consultar()
            console.log("Fecha real obtenida:", fechaReal);
        }
    }, [fechaReal]);

    const consultar = async () => {
        try {
            setLista((await axios.get(`${url}/intranet/peliculas?fechaReal=${fechaReal.toISOString()}`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data.sort(ordenamientoFecha).reverse());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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
                                    <td className='td' data-label='Nombre'>
                                        <input
                                            type="text"
                                            className="form-control ms-end sinopsis"
                                            placeholder="Nombre"
                                            name="nombre"
                                            value={el.nombre}
                                            /*onChange={(e) => onInputChange(e)}*/
                                            required
                                        />
                                    </td>
                                    <td className='td' data-label='Duración'>
                                        <input
                                            type="number"
                                            min="0"
                                            max="500"
                                            step="0"
                                            className="form-control ms-end"
                                            placeholder="Duración"
                                            name="duracion"
                                            value={el.duracion}
                                            style={{ width: '100px' }}
                                            /*onChange={(e) => {
                                                const input = e.target.value;
                                                const regex = /^\d*\.?\d{0}$/; // permite hasta 0 decimales
                                                if (input === "" || regex.test(input)) {
                                                    onInputChange(e)
                                                };
                                            }
                                            }*/
                                            required

                                        />
                                    </td>
                                    <td className='td' data-label='Sinopsis'><div className='sinopsis'>{el.sinopsis}</div></td>
                                    <td className='td' data-label='Género'>{el.genero === "" || el.genero === " " ? "-" : el.genero}</td>
                                    <td className='td' data-label='Director'>
                                        <input
                                            type="text"
                                            className="form-control ms-end"
                                            placeholder="Director"
                                            name="director"
                                            value={el.director}
                                            style={{ width: '250px' }}
                                            /*onChange={(e) => onInputChange(e)}*/
                                            required
                                        />
                                    </td>
                                    <td className='td' data-label='Clasificación'>{el.clasificacion === "" | el.clasificacion === " " ? "-" : el.clasificacion}</td>
                                    <td className='td' data-label='Estado'>{el.estado}</td>
                                    <td className='td' data-label='Actores'>
                                        <input
                                            type="text"
                                            className="form-control ms-end"
                                            placeholder="Actores"
                                            name="actores"
                                            value={el.actores}
                                            style={{ width: '250px' }}
                                        /*onChange={(e) => onInputChange(e)}*/
                                        />
                                    </td>
                                    <td className='td' data-label='Inicio de estreno'>
                                        <input
                                            type="date"
                                            className="form-control ms-end"
                                            name="fechaInicioEstreno"
                                            min={fechaReal ? format(fechaReal, 'yyyy-MM-dd') : ''}
                                            value={el.fechaInicioEstreno ? format(el.fechaInicioEstreno, 'yyyy-MM-dd') : ''}
                                            style={{ width: '150px' }}
                                            /*onChange={(e) => onFechaChange(e)}*/
                                            required
                                        />
                                    </td>
                                    <td className='td' data-label='Imagen'>
                                        <div className='d-flex align-items-center'>
                                            <a href={el.imageUrl} target="_blank" rel="noopener noreferrer">
                                                <strong>Enlace</strong>
                                            </a>
                                            <button className='d-flex align-items-center btn btn-primary p-2 mx-2'>
                                                <img src={iconoEditar} alt="" style={{ height: '20px' }} />
                                            </button>
                                        </div>
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