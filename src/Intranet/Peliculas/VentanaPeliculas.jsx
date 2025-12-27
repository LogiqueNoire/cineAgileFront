import React, { useContext, useEffect, useState } from 'react';
import AddFilm from './AddFilm';
import './VentanaPeliculas.css'
import axios from 'axios';
import { env, url } from "@/configuracion/backend"
import Loading from '@/components/Loading/Loading';
import Cookies from 'js-cookie';
import { format, parse } from 'date-fns';
import iconoEditar from '@/assets/operaciones/pencil.svg'
import link from '@/assets/operaciones/link.svg'
import PeliculaModal from './PeliculaModal';
import TimeService from '@/services/TimeService';

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

    useEffect(() => {
        (async () => {
            const data = await TimeService.obtenerFecha();
            setFechaReal(data);
        })();
    }, []);

    useEffect(() => {
        if (fechaReal) {
            consultarPeliculas()
            env === "dev" && console.log("Fecha real obtenida:", fechaReal);
        }
    }, [fechaReal]);

    const consultarPeliculas = async () => {
        setLoading(true);
        const f = format(fechaReal, "yyyy-MM-dd'T'HH:mm:ss")
        try {
            setLista((await axios.get(`${url}/api/intranet/v1/peliculas?fecha=${f}`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data.sort(ordenamientoFecha).reverse());
        } catch (error) {
            console.error(error);
        } finally {
            env === "dev" && console.log(fechaReal.toISOString())
            setLoading(false);
        }
    }

    useEffect(() => {
        env === "dev" && console.log(lista)
        setResultados(lista)
    }, [lista])

    const editarOnClick = (pelicula) => {
        setPelicula(pelicula);
    };

    const onPeliModalCerrar = () => {
        setPelicula(null);
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
        env === "dev" && console.log(resultados)

    };

    const seleccionar = (item) => {
        const datos = item.split('|').map(e => e.trim())
        if (e)

            env === "dev" && console.log(datos)
        const encontrado = productos.find(el => el.nombre == datos[0])
        setResultados([]);
        setLista(prev => [...prev, encontrado]);
        setBusqueda()
    };

    return (
        <div>
            <div className='d-flex flex-column gap-4 align-items-center container-fluid'>
                <AddFilm onSucess={consultarPeliculas}></AddFilm>

                {loading === true
                    ? <div className='d-flex flex-column align-items-center container'><Loading></Loading></div> :

                    <div>
                        <div className='d-flex flex-wrap align-items-center justify-content-center gap-2 m-4'>
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
                            <thead className='thead table-white'>
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
                                            <a href={el.imageUrl} target="_blank" rel="noopener noreferrer" className='d-flex btn btn-primary btn-primary-gradient p-2' style={{ width: "min-content" }}>
                                                <img src={link} alt="" style={{ height: '20px' }} />
                                            </a>

                                        </td>
                                        <td>
                                            <button className='d-flex align-items-center btn btn-primary btn-primary-gradient p-2 mx-2' onClick={() => editarOnClick(el)}>
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


            {pelicula && <PeliculaModal pelicula={pelicula} onCerrar={onPeliModalCerrar} consultarPeliculas={consultarPeliculas} />}
        </div>
    )
}

export default VentanaPeliculas;