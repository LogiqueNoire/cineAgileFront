import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import { useNavigate } from 'react-router-dom'
import Loading from '../../0 componentesGenerales/Loading';
import sala from '../../assets/sala.svg'
import Cookies from 'js-cookie';
import { se } from 'date-fns/locale';
import { set } from 'date-fns';
import SalaButaca from '../../servicios/SalaButaca';
import Pelicula from '../../servicios/Pelicula';
import Cronograma from './Cronograma';

const ordenamientoAlfa = (a, b) => {
    const x = a.nombre.toLowerCase();
    const y = b.nombre.toLowerCase();

    return x < y ? -1 : 1;
}

const VentanaSedesYSalas = () => {
    const [sedes, setSedes] = useState([]);
    const [peliculasSede, setPeliculasSede] = useState([]);
    const [salasSede, setSalasSede] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sedeElegida, setSedeElegida] = useState('');
    const [primeraVez, setPrimeraVez] = useState(true)
    const [fechaElegida, setFechaElegida] = useState(new Date().toISOString().split('T')[0]); // Formato YYYY-MM-DD
    const [selectPelicula, setSelectPelicula] = React.useState('');
    const [selectSala, setSelectSala] = React.useState('');

    const [funciones, setFunciones] = useState([]);


    const consultarSedes = async () => {
        try {
            setSedes((await axios.get(`${url}/intranet/soloSedes`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const moverse = (e) => {
        setPrimeraVez(false)
        setSedeElegida(e.target.value);
    }

    const handlePeliculaChange = async (e) => {
        const peliculaId = e.target.value;
        console.log("Pelicula elegida:", peliculaId);
        console.log("Fecha elegida:", fechaElegida);
        console.log("Sede elegida:", sedeElegida);
        if (peliculaId) {
            setSelectSala('')
            setSelectPelicula(peliculaId);
            try {
                setFunciones((await axios.get(`${url}/intranet/buscarFuncionesPorSemanaConPelicula`, {
                    params: {
                        idPelicula: peliculaId,
                        fecha: `${fechaElegida}T00:00:00`,
                        idSede: sedeElegida
                    },
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })).data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleSalaChange = async (e) => {
        const salaId = e.target.value;
        console.log("sala elegida:", salaId);
        console.log("Fecha elegida:", fechaElegida);
        console.log("Sede elegida:", sedeElegida);
        if (salaId) {
            setSelectPelicula('')
            setSelectSala(salaId);
            try {
                setFunciones((await axios.get(`${url}/intranet/buscarFuncionesPorSemanaConSala`, {
                    params: {
                        idSala: salaId,
                        fecha: `${fechaElegida}T00:00:00`,
                        idSede: sedeElegida
                    },
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })).data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        console.log(funciones)
    }, [funciones])

    useEffect(() => {
        consultarSedes()
    }, [])

    useEffect(() => {
        console.log("Solos sedes", sedes)
    }, [sedes])

    useEffect(() => {
        if (sedeElegida !== '') {
            Pelicula.mostrarPeliculasPorSede(sedeElegida)
                .then(data => setPeliculasSede(data.sort(ordenamientoAlfa)))
                .catch(err => console.error("Error al obtener peliculas por sede:", err));

            SalaButaca.salasPorSede(sedeElegida)
                .then(data => setSalasSede(data))
                .catch(err => console.error("Error al obtener salas por sede:", err));
        }
    }, [sedeElegida])


    return (
        <div>
            <div className='d-flex flex-column align-items-center'>
                {loading === true
                    ? <Loading></Loading> :
                    <div className='d-flex flex-column align-items-center gap-4 m-3 border p-4 rounded'>
                        <div className='d-flex gap-4 w-100'>
                            <div>
                                <label className='d-flex text-nowrap'>Elige sede</label>
                                <select className='form-select' onChange={(e) => moverse(e)}>
                                    <option value='0'>Elija una sede</option>
                                    {sedes.map((el, id) => (
                                        <option key={el.id || id} value={el.id} >{el.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className='d-flex text-nowrap'>Elige fecha dentro de una semana</label>
                                <input type='date' className='form-control' value={fechaElegida} placeholder='Fecha'
                                 onChange={
                                    (e) => {
                                        setFechaElegida(e.target.value)
                                        setSelectPelicula('')
                                        setSelectSala('')
                                        setFunciones([]) // Limpiar funciones al cambiar la fecha
                                    }
                                    } />
                            </div>

                        </div>
                        <div className='d-flex gap-4 w-100 align-items-center'>
                            <label className='d-flex text-nowrap'>Elige pelicula o sala</label>
                            <div>
                                <label className='d-flex text-nowrap'>Pelicula</label>
                                {peliculasSede.length > 0 ?
                                    <select value={selectPelicula} className='form-select' onChange={(e) => handlePeliculaChange(e)}>
                                        <option value="0">Elije una pelicula</option>
                                        {peliculasSede.map((el, id) => (
                                            <option key={el.id || id} value={el.id} >{el.nombre}</option>
                                        ))}
                                    </select>
                                    :
                                    <select className='form-select' disabled>
                                        <option value="">No hay peliculas</option>
                                    </select>}
                            </div>
                            <div>
                                <label className='d-flex text-nowrap'>Sala</label>
                                {salasSede.length > 0 ?
                                    <select value={selectSala} className='form-select' onChange={(e) => handleSalaChange(e)}>
                                        <option value="">Elije una sala</option>
                                        {salasSede.map((el, id) => (
                                            <option key={el.id || id} value={el.id} >{el.codigoSala}</option>
                                        ))}
                                    </select>
                                    :
                                    <select className='form-select' disabled>
                                        <option value="">No hay salas</option>
                                    </select>}
                            </div>
                        </div>
                    </div>
                }
            </div>
            {funciones.length > 0 ?
                <Cronograma funciones={funciones} fechaConsultada={new Date(fechaElegida)} />
                : <div className='d-flex justify-content-center align-items-center m-4'>
                    <h3>No hay funciones para mostrar</h3>
                </div>}

        </div>
    )
}

export default VentanaSedesYSalas;