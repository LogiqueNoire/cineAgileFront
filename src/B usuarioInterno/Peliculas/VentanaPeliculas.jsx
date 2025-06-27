import React, { useContext, useEffect, useState } from 'react';
import AddFilm from './AddFilm';
import './VentanaPeliculas.css'
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Loading from '../../0 componentesGenerales/Loading';
import Cookies from 'js-cookie';
import { format, parse } from 'date-fns';
import iconoEditar from '../../assets/editar.svg'
import PeliculaModal from './PeliculaModal';

const ordenamientoFecha = (a, b) => {
    const x = a.fechaInicioEstreno;
    const y = b.fechaInicioEstreno;

    return x < y ? -1 : 1;
}

const VentanaPeliculas = () => {
    const [fechaReal, setFechaReal] = useState()

    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pelicula, setPelicula] = useState(null);

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
            consultarPeliculas()
            console.log("Fecha real obtenida:", fechaReal);
        }
    }, [fechaReal]);

    const consultarPeliculas = async () => {
        setLoading(true);

        try {
            setLista((await axios.get(`${url}/intranet/peliculas?fechaReal=${format(fechaReal, "yyyy-MM-dd'T'HH:mm:ss")}`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data.sort(ordenamientoFecha).reverse());
        } catch (error) {
            console.error(error);
        } finally {
            console.log(fechaReal.toISOString())
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(lista)
        setResultados(lista)
    }, [lista])

    const editarOnClick = (pelicula) => {
        setPelicula(pelicula);
    };

    const onPeliModalCerrar = () => {
        setPelicula(null);
        consultarPeliculas();
    }

    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState();


    const manejarCambio = (e) => {
        const texto = e.target.value;
        setBusqueda(texto);
        if (texto.length > 0) {
            const filtrados = lista.filter(item =>
                item.nombre.toLowerCase().includes(texto.toLowerCase())
            );
            setResultados(filtrados);
        } else {
            setResultados(lista);
        }
        console.log("resultados", resultados)

    };

    const seleccionar = (item) => {
        const datos = item.split('|').map(e => e.trim())
        console.log(datos)
        const encontrado = productos.find(el => el.nombre == datos[0])
        setResultados([]);
        setLista(prev => [...prev, encontrado]);
        setBusqueda()
    };

    return (
        <div>
            <div className='d-flex flex-column gap-4 align-items-center'>
                <AddFilm onSucess={consultarPeliculas}></AddFilm>

                {loading === true
                    ? <div className='d-flex flex-column align-items-center container'><Loading></Loading></div> :

                    <div>
                        <div className='hstack justify-content-center gap-2 m-4'>
                            <h3>Buscar película</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder='Nombre de película'
                                    className='form-control'
                                    value={busqueda}
                                    onChange={manejarCambio}
                                    style={{ width: '300px' }}
                                />
                            </div>
                        </div>

                        <table className='table mytable table-striped border table-hover mt-4'>
                            <thead className='thead'>
                                <tr>
                                    <th className='td'>Nombre</th>
                                    <th className='td'>Duración (min)</th>
                                    <th className='td'>Sinopsis</th>
                                    <th className='td'>Clasificación</th>
                                    <th className='td'>Estado</th>
                                    <th className='td'>Fecha de estreno</th>
                                    <th className='td'>Imagen</th>
                                    <th className='td'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='tbody'>
                                {resultados.map((el, id) => (

                                    <tr className='tr' key={id}>
                                        <td className='td' data-label='Nombre'>
                                            {el.nombre}
                                        </td>
                                        <td className='td' data-label='Duración'>
                                            {el.duracion}
                                        </td>
                                        <td className='td' data-label='Sinopsis'><div className='sinopsis' style={{ width: '200px' }}>{el.sinopsis}</div></td>
                                        <td className='td' data-label='Clasificación'>{el.clasificacion === "" | el.clasificacion === " " ? "-" : el.clasificacion}</td>
                                        <td className='td' data-label='Estado'>{el.estado}</td>
                                        <td className='td' data-label='Inicio de estreno'>
                                            {el.fechaInicioEstreno ? format(parse(el.fechaInicioEstreno, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : ''}
                                        </td>
                                        <td className='td' data-label='Imagen'>
                                            <a href={el.imageUrl} target="_blank" rel="noopener noreferrer">
                                                <strong>Enlace</strong>
                                            </a>

                                        </td>
                                        <td>
                                            <button className='d-flex align-items-center btn btn-primary p-2 mx-2' onClick={() => editarOnClick(el)}>
                                                <img src={iconoEditar} alt="" style={{ height: '20px' }} />
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>
                    </div>
                }
            </div>


            {pelicula && <PeliculaModal pelicula={pelicula} onCerrar={onPeliModalCerrar} />}
        </div>
    )
}

export default VentanaPeliculas;