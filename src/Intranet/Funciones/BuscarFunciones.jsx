import { useContext, useState, useEffect } from "react";
import { FuncionesContext } from "./FuncionesContext";
import Loading from '../../0 componentesGenerales/Loading';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Cookies from 'js-cookie';

const ordenamientoAlfa = (a, b) => {
    const x = a.nombre.toLowerCase();
    const y = b.nombre.toLowerCase();

    return x < y ? -1 : 1;
}

const BuscarFunciones = ({ handlePeliculaChange, handleSalaChange }) => {
    const [loading, setLoading] = useState(true);
    const {
        valoresBusqueda,
        setValoresBusqueda,
        funcion,
        setFuncion,
        listaFunciones,
        setListaFunciones
    } = useContext(FuncionesContext);

    const [primeraVez, setPrimeraVez] = useState(true)

    useEffect(() => {
        if (primeraVez) {
            consultarSedesTodas()
            consultarSedesActivas()
        } else {
            setPrimeraVez(false);
        }
    }, [primeraVez])

    const consultarSedesTodas = async () => {
        try {
            const datos = (await axios.get(`${url}/api/v1/intranet/sedes`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setValoresBusqueda(prev => ({
                ...prev,
                sedesTodas: datos != undefined ? datos.sort(ordenamientoAlfa) : undefined
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const consultarSedesActivas = async () => {
        try {
            const datos = (await axios.get(`${url}/api/v1/intranet/sedes/activas`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setValoresBusqueda(prev => ({
                ...prev,
                sedesActivas: datos != undefined ? datos.sort(ordenamientoAlfa) : undefined
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const cambiarSede = (e) => {
        setPrimeraVez(false)
        setValoresBusqueda(prev => ({
            ...prev,
            sedeElegida: e.target.value
        }));
    }

    return (
        loading === true
            ? <Loading></Loading> :
            <div className='d-flex flex-column align-items-center gap-4 m-3 border p-4 rounded'>
                <h3>Búsqueda de funciones</h3>
                <div>
                    <label className='d-flex text-nowrap'>Elige sede</label>
                    <select className='form-select' onChange={(e) => cambiarSede(e)}>
                        <option value='0'>Elija una sede</option>
                        {valoresBusqueda.sedesTodas.map((el, id) => (
                            <option key={el.id || id} value={el.id} >{el.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="d-flex gap-4">

                    <div className="">
                        <label className='d-flex text-nowrap'>Elige fecha dentro de una semana</label>
                        <input type='date' className='form-control' value={valoresBusqueda.fechaElegida} placeholder='Fecha'
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={
                                (e) => {
                                    setValoresBusqueda(prev => ({
                                        ...prev,
                                        fechaElegida: e.target.value
                                    }));
                                    setListaFunciones([]) // Limpiar funciones al cambiar la fecha
                                }
                            } />
                    </div>
                    <div>
                        <label className='text-nowrap'>Filtro</label>
                        {valoresBusqueda.sedeElegida === '' || valoresBusqueda.sedeElegida === '0' ?
                            <select className='form-select' disabled>
                                <option value=''>Elige filtro</option>
                            </select>
                            :
                            <select className='form-select' value={valoresBusqueda.filtro} onChange={(e) => {
                                setValoresBusqueda(prev => ({
                                    ...prev,
                                    filtro: e.target.value,
                                    selectPelicula: '',
                                    selectSala: '',
                                }));
                                setListaFunciones([])
                            }} >
                                <option value=''>Elige filtro</option>
                                <option value='pelicula'>Por película</option>
                                <option value='sala'>Por sala</option>
                            </select>
                        }
                    </div>
                </div>

                <div className='d-flex gap-4 w-100 align-items-center justify-content-center'>

                    {
                        valoresBusqueda.filtro === 'pelicula' ?
                            valoresBusqueda.peliculasSede != undefined ?
                                <div className="">
                                    <label className='d-flex text-nowrap'>Pelicula</label>
                                    {valoresBusqueda.peliculasSede.length > 0 && valoresBusqueda.peliculasSede != undefined ?
                                        <select value={valoresBusqueda.selectPelicula} className='form-select' onChange={(e) => { handlePeliculaChange(e), setLoading(e) }}>
                                            <option value="0">Elige una película por la sede</option>
                                            {valoresBusqueda.peliculasSede.map((el, id) => (
                                                <option key={el.id || id} value={el.id} >{el.nombre}</option>
                                            ))}
                                        </select>
                                        :
                                        <select className='form-select' disabled>
                                            <option value="">No hay peliculas</option>
                                        </select>
                                    }
                                </div>
                                :
                                <Loading style={{ 'margin': '0px', 'width': '62px', 'height': '62px' }}></Loading>
                            :
                            <></>
                    }
                    {
                        valoresBusqueda.filtro === 'sala' ?
                            valoresBusqueda.salasSede != undefined ?
                                <div>
                                    <label className='d-flex text-nowrap'>Sala</label>
                                    {valoresBusqueda.salasSede.length > 0 ?
                                        <select value={valoresBusqueda.selectSala}
                                            className='form-select' onChange={(e) => handleSalaChange(e)}>
                                            <option value="">Elige una sala de la sede</option>
                                            {valoresBusqueda.salasSede.map((el, id) => (
                                                <option key={el.id || id} value={el.id} >{el.codigoSala}</option>
                                            ))}
                                        </select>
                                        :
                                        <select className='form-select' disabled>
                                            <option value="">No hay salas</option>
                                        </select>
                                    }
                                </div> :

                                <Loading style={{ 'margin': '0px', 'width': '62px', 'height': '62px' }}></Loading>
                            :
                            <></>
                    }
                </div>

            </div>

    )
}

export default BuscarFunciones;