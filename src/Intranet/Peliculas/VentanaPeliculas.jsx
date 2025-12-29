import React, { useEffect, useState } from 'react';
import AddFilm from './AddFilm';
import './VentanaPeliculas.css'
import axios from 'axios';
import { env, url } from "@/configuracion/backend"
import Loading from '@/components/Loading/Loading';
import Cookies from 'js-cookie';
import { format, parse } from 'date-fns';
import { editIcon, linkIcon } from '@/assets/operaciones';
import PeliculaModal from './PeliculaModal';
import TimeService from '@/services/TimeService';

const ordenamientoFecha = (a, b) => {
    const x = a.fechaInicioEstreno;
    const y = b.fechaInicioEstreno;

    return x < y ? -1 : 1;
}

const estrenoColores = [
    ["En cartelera", "#b8f8ffff", "#007683ff"], //celeste
    ["Próximamente", "#fcffa8", "#928100ff"], //amarillo
    ["Estreno", "#b3f0c1", "#00771cff"], //verde
    ["Finalizada", "#b3d6f0", "#01518fff"], //azul
]

const clasificacionColores = [
    [" ", "#b8f8ffff", "#007683ff"],
    ["+14", "#fcffa8", "#928100ff"], //amarillo
    ["Apto para todos", "#b3f0c1", "#00771cff"], //verde
    ["", "#b3d6f0", "#01518fff"], //azul
    ["+18", "#f1bcb3ff", "#8a1500ff"], //rojo
]

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
            env === "dev" && console.log(fechaReal?.toISOString())
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

    return (
        <div>
            <div className='d-flex flex-column gap-4 align-items-center container-fluid'>
                <AddFilm onSucess={consultarPeliculas}></AddFilm>
                <h2 className="text-center mt-4 ancizar-sans-regular mb-0">Películas registradas</h2>
                {loading === true
                    ? <div className='d-flex flex-column align-items-center container'><Loading></Loading></div> :

                    <div>
                        {resultados === null || resultados?.length == 0 ?
                            <p className='mb-4 fs-4 text-center ancizar-sans-regular'>¡No hay películas registradas!</p>
                            :
                            <>
                                <div className='d-flex flex-wrap align-items-center justify-content-center gap-2 m-4'>
                                    <h3 className='ancizar-sans-regular mb-0'>Buscar película</h3>
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
                                        {resultados?.map((el, id) => (

                                            <tr className='tr' key={id}>
                                                <td className='td' data-label='Nombre'>{el.nombre}</td>
                                                <td className='td' data-label='Duración'>{el.duracion}</td>
                                                <td className='td' data-label='Sinopsis'>
                                                    <div className='sinopsis' style={{ width: '200px' }}>
                                                        {el.sinopsis === "" | el.sinopsis === " " ? "-" : el.sinopsis}
                                                    </div>
                                                </td>
                                                <td className='td' data-label='Clasificación'>
                                                    <span className={`rounded-5 fw-bold p-1 px-2`} style={{
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        backgroundColor: clasificacionColores[clasificacionColores.findIndex(e => e[0] === el.clasificacion)][1],
                                                        color: clasificacionColores[clasificacionColores.findIndex(e => e[0] === el.clasificacion)][2]
                                                    }}>{el.clasificacion === "" | el.clasificacion === " " ? "-" : el.clasificacion}</span>
                                                </td>
                                                <td className='td' data-label='Estado'>
                                                    <span className={`rounded-5 fw-bold p-1 px-2`} style={{
                                                        backgroundColor: estrenoColores[estrenoColores.findIndex(e => e[0] === el.estado)][1],
                                                        color: estrenoColores[estrenoColores.findIndex(e => e[0] === el.estado)][2]
                                                    }}>{el.estado}</span></td>
                                                <td className='td' data-label='Inicio de estreno'>
                                                    {el.fechaInicioEstreno ? format(parse(el.fechaInicioEstreno, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : ''}
                                                </td>
                                                <td className='td td-button' data-label='Imagen'>
                                                    <a href={el.imageUrl} target="_blank" rel="noopener noreferrer" className='d-flex btn btn-primary btn-primary-gradient p-2' style={{ width: "min-content" }}>
                                                        <img src={linkIcon} alt="" style={{ height: '20px' }} />
                                                    </a>
                                                </td>
                                                <td className='td td-button' data-label="Acciones">
                                                    <button className='d-flex align-items-center btn btn-primary btn-primary-gradient p-2' onClick={() => editarOnClick(el)}>
                                                        <img src={editIcon} alt="" style={{ height: '20px' }} />
                                                    </button>
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>

                                </table>
                            </>}
                    </div>
                }
            </div>


            {pelicula && <PeliculaModal pelicula={pelicula} onCerrar={onPeliModalCerrar} consultarPeliculas={consultarPeliculas} />}
        </div>
    )
}

export default VentanaPeliculas;