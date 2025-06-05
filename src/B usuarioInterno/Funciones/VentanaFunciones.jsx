import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import { useNavigate } from 'react-router-dom'
import Loading from '../../0 componentesGenerales/Loading';
import sala from '../../assets/sala.svg'
import Cookies from 'js-cookie';
import { se } from 'date-fns/locale';


const VentanaSedesYSalas = () => {
    const [sedes, setSedes] = useState([]);
    const [peliculasSede, setPeliculasSede] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sedeElegida, setSedeElegida] = useState();
    const navigate = useNavigate();
    const [modalAbierto, setModalAbierto] = useState(false)
    const [primeraVez, setPrimeraVez] = useState(true)

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

    const consultarPeliculasPorSede = async () => {
        let s
        try {
            setPeliculasSede(['Cargando...']);
            s = ((await axios.get(`${url}/intranet/peliculasPorSede`, {
                params: { nombreSede: sedeElegida },
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data);
        } catch (error) {
            console.error(error);
        } finally {
            setPeliculasSede(s);
        }
    }

    const moverse = (e) => {
        setPrimeraVez(false)
        setSedeElegida(e.target.value);
    }

    useEffect(() => {
        if (!primeraVez) {
            setModalAbierto(true);
        }
    }, [primeraVez]);


    useEffect(() => {
        consultarSedes()
    }, [])

    useEffect(() => {
        console.log("Solos sedes", sedes)
    }, [sedes])

    useEffect(() => {
        if (sedeElegida !== undefined) {
            setPeliculasSede(['Cargando...'])
            setPeliculasSede(consultarPeliculasPorSede())
        }
    }, [sedeElegida])

    const funcionCambiar = () => {
        setModalAbierto(false)
        setPrimeraVez(true)
        consultarSedes()
    }

    return (
        <div>
            <div className='d-flex flex-column align-items-center container'>
                {loading === true
                    ? <Loading></Loading> :
                    <div className='d-flex gap-4 m-4'>

                        <select className='form-select' onChange={(e) => moverse(e)}>
                            <option value="">Seleccione una sede</option>
                            {sedes.map((el, id) => (
                                <option key={el.id || id} value={el.id} >{el.nombre}</option>
                            ))}
                        </select>
                        {peliculasSede.length > 0 ? 
                        <select className='form-select' /*onChange={() => moverse()}*/>
                            <option value="">Seleccione una pelicula</option>
                            {peliculasSede.map((el, id) => (
                                <option key={el.id || id} value={el.id} >{el.nombre}</option>
                            ))}
                        </select>
                        :
                        <select className='form-select' disabled>
                            <option value="">No hay peliculas disponibles</option> 
                        </select>}



                    </div>


                }
            </div>
        </div>
    )
}

export default VentanaSedesYSalas;