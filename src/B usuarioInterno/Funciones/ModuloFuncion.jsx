import { useContext, useState, useEffect } from "react";
import { FuncionesContext } from "./FuncionesContext";
import Loading from '../../0 componentesGenerales/Loading';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Cookies from 'js-cookie';
import { format } from "date-fns";
import './ModuloFuncion.css'

const ModuloFuncion = ({ handlePeliculaChange, handleSalaChange }) => {
    const [loading, setLoading] = useState(true);
    const {
        valoresBusqueda,
        setValoresBusqueda,
        funcion,
        setFuncion,
        listaFunciones,
        setListaFunciones
    } = useContext(FuncionesContext);

    const [checked, setChecked] = useState(true)

    const cambiarEstado = (checked) => {
        setChecked(checked)
        setFuncion({
            codigoFuncion: '',
            nuevaFecha: '',
            nuevaHoraInicio: '',
            nuevoCodigoSala: ''
        });

    }

    const actualizarFuncion = async () => {
        let nfhi;
        if (!funcion.nuevaHoraInicio) {
            alert("Debe ingresar una nueva hora de inicio");
            return;
        }
        listaFunciones.map((el) => {
            if (el.idFuncion === Number(funcion.codigoFuncion)) {
                const [horaRef, minutoRef] = funcion.nuevaHoraInicio.split(':').map(Number);
                if ((new Date(el.fechaHoraInicio)).getHours() === horaRef && (new Date(el.fechaHoraInicio)).getMinutes() === minutoRef
                    && funcion.nuevaFecha === '') {
                    alert("La hora de inicio es la misma que la actual");
                    return;
                } else {
                    if (funcion.nuevaFecha !== '') {
                        // Si se ha proporcionado una nueva fecha, combinarla con la nueva hora
                        const [anio, mes, dia] = funcion.nuevaFecha.split('-').map(Number);
                        nfhi = new Date(anio, mes - 1, dia);
                        console.log("Nueva fecha:", funcion.nuevaFecha);
                        console.log("Nueva fecha h i:", nfhi);
                        nfhi.setHours(funcion.nuevaHoraInicio.split(':')[0]);
                        nfhi.setMinutes(funcion.nuevaHoraInicio.split(':')[1]);
                    }
                    nfhi.setHours(funcion.nuevaHoraInicio.split(':')[0]);
                    nfhi.setMinutes(funcion.nuevaHoraInicio.split(':')[1]);
                    //formatear
                    nfhi = format(nfhi, "yyyy-MM-dd'T'HH:mm:ss");
                    console.log("Nueva fecha de inicio con minutos:", nfhi);
                }
            }

            if (!el.fechaHoraInicio) {
                alert("La función no tiene una fecha de inicio válida");
                return;
            }

        })

        try {
            console.log("Actualizando función con código:", funcion.codigoFuncion);
            console.log("Nueva fecha y hora de inicio:", nfhi);
            const response = await axios.patch(`${url}/intranet/actualizarFuncion`, {
                idFuncion: funcion.codigoFuncion,
                fechaHoraInicio: nfhi,
                fechaHoraFin: null,
                dimension: null,
                precioBase: null,
                idSede: null,
                nombreSede: null,
                idSala: null,
                categoria: null,
                codigoSala: funcion.codigoSala,
                idPelicula: null,
                nombrePelicula: null
            }, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

            if (response.status === 200) {
                if (valoresBusqueda.selectSala) {
                    handleSalaChange({ target: { value: valoresBusqueda.selectSala } });
                } else if (valoresBusqueda.selectPelicula) {
                    handlePeliculaChange({ target: { value: valoresBusqueda.selectPelicula } });
                }

                setFuncion(prev => ({
                    ...prev,
                    codigoFuncion: '',
                    nuevaHoraInicio: '',
                    nuevaFecha: '',
                    codigoSala: ''
                }));
            }
        } catch (error) {
            console.error("Error al actualizar la función:", error);
        }
    }

    return (

        listaFunciones.length > 0 ?
            <div className='d-flex flex-column align-items-center gap-4 m-3 border p-4 rounded'>
                <div className='d-flex flex-column align-items-center gap-3'>
                    <h3 className='d-flex text-nowrap'>Módulo ágil de funciones</h3>
                    <div className="d-flex align-items-center">
                        {checked === true ?  /*true = actualizar */
                            <label className="fs-4">Crear</label>
                            :
                            <label className="fs-4"><strong style={{ "color": "#01217B" }}>Crear</strong></label>
                        }
                        <label class="switch m-2">
                            <input type="checkbox" checked={checked} onChange={(e) => { cambiarEstado(e.target.checked) }} />
                            <span class="slider round"></span>
                        </label>
                        {checked === true ?
                            <label className="fs-4"><strong style={{ "color": "#01217B" }}>Actualizar</strong></label>
                            :
                            <label className="fs-4">Actualizar</label>}
                    </div>
                    {checked === true ?
                        funcion.funcionElegida === undefined || funcion.funcionElegida === '' ?
                            <div className="d-flex flex-column gap-3">
                                <label>Clickea una función para copiar sus datos</label>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Código de función</label>
                                    <input className='form-control w-100' disabled type="text"></input>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva fecha</label>
                                    <input className='form-control w-100' disabled type="date"></input>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva hora de inicio (formato 24h)</label>
                                    <input className='form-control w-100' disabled type="time"></input>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Sala</label>

                                    <select value='' disabled
                                        className='form-select w-100'>
                                        <option value="">Elige una sala</option>

                                    </select>
                                </div>

                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Pelicula</label>

                                    <select value='' disabled
                                        className='form-select w-100' >
                                        <option value="0">Elige una película</option>

                                    </select>
                                </div>

                                <button className='btn btn-primary' disabled >Actualizar</button>
                            </div>
                            :
                            <div className="d-flex flex-column gap-3">
                                <label>Clickea una función para copiar sus datos</label>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Código de función</label>
                                    <input className='form-control w-100' type="text" value={funcion.codigoFuncion}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                codigoFuncion: e.target.value
                                            }))
                                        }></input>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva fecha</label>
                                    <input className='form-control w-100' type="date" value={funcion.nuevaFecha}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                nuevaFecha: e.target.value
                                            }))
                                        }></input>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva hora de inicio (formato 24h)</label>
                                    <input className='form-control w-100' type="time" value={funcion.nuevaHoraInicio}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                nuevaHoraInicio: e.target.value
                                            }))
                                        }></input>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Sala</label>

                                    <select value={funcion.nuevaSalaId}
                                        className='form-select w-100'
                                        onChange={(e) => setFuncion(prev => ({
                                            ...prev,
                                            nuevaSalaId: valoresBusqueda.salasSede.find(el => el.codigoSala === funcion.funcionElegida.codigoSala)?.id
                                        }))
                                        }>
                                        <option value="">Elige una sala</option>
                                        {valoresBusqueda.salasSede.map((el, id) => (
                                            <option key={el.id || id} value={el.id} >{el.codigoSala}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Pelicula</label>

                                    <select value={funcion.nuevaPeliculaId}
                                        className='form-select w-100'
                                        onChange={(e) => setFuncion(prev => ({
                                            ...prev,
                                            nuevaPeliculaId: valoresBusqueda.peliculasSede.find(el => el.id === funcion.funcionElegida.idPelicula)?.id
                                        }))
                                        }>
                                        <option value="0">Elige una película</option>
                                        {valoresBusqueda.peliculasSede.map((el, id) => (
                                            <option key={el.id || id} value={el.id} >{el.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <button className='btn btn-primary' onClick={(e) => {
                                    e.preventDefault();
                                    actualizarFuncion()
                                }}>Actualizar</button>
                            </div>
                        :
                        <div className="d-flex flex-column gap-3">
                            <div className='d-flex w-100 align-items-center'>
                                <label className='w-100'>Nueva fecha</label>
                                <input className='form-control w-100' type="date" value={funcion.nuevaFecha}
                                    onChange={(e) =>
                                        setFuncion(prev => ({
                                            ...prev,
                                            nuevaFecha: e.target.value
                                        }))
                                    }></input>
                            </div>
                            <div className='d-flex w-100 align-items-center'>
                                <label className='w-100'>Nueva hora de inicio (formato 24h)</label>
                                <input className='form-control w-100' type="time" value={funcion.nuevaHoraInicio}
                                    onChange={(e) =>
                                        setFuncion(prev => ({
                                            ...prev,
                                            nuevaHoraInicio: e.target.value
                                        }))
                                    }></input>
                            </div>
                            <div className='d-flex w-100 align-items-center'>
                                <label className='w-100'>Sala</label>

                                <select value={funcion.nuevaSalaId}
                                    className='form-select w-100'
                                    onChange={(e) => setFuncion(prev => ({
                                        ...prev,
                                        nuevaSalaId: valoresBusqueda.salasSede.find(el => el.codigoSala === funcion.funcionElegida.codigoSala)?.id
                                    }))
                                    }>
                                    <option value="">Elige una sala</option>
                                    {valoresBusqueda.salasSede.map((el, id) => (
                                        <option key={el.id || id} value={el.id} >{el.codigoSala}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='d-flex w-100 align-items-center'>
                                <label className='w-100'>Pelicula</label>

                                <select value={funcion.nuevaPeliculaId}
                                    className='form-select w-100'
                                    onChange={(e) => setFuncion(prev => ({
                                        ...prev,
                                        nuevaPeliculaId: valoresBusqueda.peliculasSede.find(el => el.id === funcion.funcionElegida.idPelicula)?.id
                                    }))
                                    }>
                                    <option value="0">Elige una película</option>
                                    {valoresBusqueda.peliculasSede.map((el, id) => (
                                        <option key={el.id || id} value={el.id} >{el.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <button className='btn btn-primary' onClick={(e) => {
                                e.preventDefault();
                                crearFuncion()
                            }}>Crear</button>
                        </div>
                    }
                </div>
            </div>
            :
            <></>
    )
};
export default ModuloFuncion