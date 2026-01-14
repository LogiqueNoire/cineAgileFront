import { useContext, useState, useEffect } from "react";
import { FuncionesContext } from "./FuncionesContext";
import axios from 'axios';
import { backend_url, env } from "@/configuracion/backend"
import Cookies from 'js-cookie';
import { format, isBefore } from "date-fns";
import './ModuloFuncion.css'
import SalaButaca from '@/services/SalaButaca';
import Fecha from "@/services/Fecha";
import TimeService from "@/services/TimeService";
import { ordenamientoAlfa } from "@/utils";
import { ToastContext } from "@/context/ToastContextProvider";

const ModuloFuncion = ({ handlePeliculaChange, handleSalaChange }) => {
    const { showToast } = useContext(ToastContext)

    const {
        valoresBusqueda,
        funcion, setFuncion,
        listaFunciones,
        listaPeliculas, setListaPeliculas,
        salasNuevaSede, setSalasNuevaSede
    } = useContext(FuncionesContext);

    const [checked, setChecked] = useState(true)

    useEffect(() => {
        obtenerFecha();
        consultarPeliculas()
    }, [])

    const [fechaReal, setFechaReal] = useState()

    useEffect(() => {
        console.log("fechareal", fechaReal)
    }, [fechaReal])

    useEffect(() => {
        const intervalo = setInterval(() => {
            obtenerFecha();
        }, 40000); // 40 segundos

        return () => clearInterval(intervalo); // limpia al desmontar
    }, []);

    /*manejo de fecha*/
    const obtenerFecha = async () => {
        setFechaReal(await TimeService.obtenerFecha());
    };

    const cambiarEstado = (checked) => {
        setChecked(checked)
        setFuncion({
            codigoFuncion: '',
            nuevaFecha: '',
            nuevaHoraInicio: '',
            nuevoCodigoSala: '',
            nuevaPeliculaId: ''
        });
    }

    const consultarPeliculas = async () => {
        try {
            const datos = (await axios.get(`${backend_url}/api/intranet/v1/peliculas`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setListaPeliculas(datos.sort(ordenamientoAlfa));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (funcion.nuevaSedeId !== '') {
            SalaButaca.salasActivasPorSede(funcion.nuevaSedeId)
                .then(data => setSalasNuevaSede(data))
                .catch(err => console.error("Error al obtener salas por sede:", err))
        } else {
            setFuncion(prev => ({ ...prev, nuevaSalaId: '0' }))
        }
    }, [funcion.nuevaSedeId])

    const enviarFuncion = async () => {
        let nfhi;
        env === "dev" && console.log("Función:", funcion, "Modo:", checked ? "actualizar" : "crear")
        env === "dev" && console.log("fecha real", fechaReal)
        const fechaHoraSeleccionada = new Date(`${funcion.nuevaFecha}T${funcion.nuevaHoraInicio}`);

        if (
            funcion.nuevaHoraInicio === '' ||
            funcion.nuevaFecha === '' ||
            funcion.nuevaDimension === '0' ||
            funcion.nuevoPrecioBase === '0' ||
            funcion.nuevaSalaId === '0' ||
            funcion.nuevaSalaId === '' ||
            funcion.nuevaPeliculaId === '0' ||
            isBefore(fechaHoraSeleccionada, fechaReal)
        ) {
            showToast({ tipo: 'toast-danger', titulo: '¡Cuidado!', mensaje: 'Faltan datos o hay error en ellos.' });
            return;
        }
        if (checked) {
            const mismaHora = listaFunciones.some((el) => {
                if (el.idFuncion === Number(funcion.codigoFuncion)) {
                    const [horaRef, minutoRef] = funcion.nuevaHoraInicio.split(':').map(Number);
                    return ((new Date(el.fechaHoraInicio)).getHours() === horaRef && (new Date(el.fechaHoraInicio)).getMinutes() === minutoRef)
                }
            })
            if (mismaHora) {
                showToast({ tipo: 'toast-warning', titulo: '¡Cuidado!', mensaje: 'La hora de inicio es la misma que la actual' });
            }
        }

        // Como se ha proporcionado una nueva fecha, combinarla con la nueva hora
        const [anio, mes, dia] = funcion.nuevaFecha.split('-').map(Number);
        nfhi = new Date(anio, mes - 1, dia);
        env === "dev" && console.log("Nueva fecha:", funcion.nuevaFecha);
        env === "dev" && console.log("Nueva fecha h i:", nfhi);
        nfhi.setHours(funcion.nuevaHoraInicio.split(':')[0]);
        nfhi.setMinutes(funcion.nuevaHoraInicio.split(':')[1]);
        nfhi = format(nfhi, "yyyy-MM-dd'T'HH:mm:ss");
        env === "dev" && console.log("Nueva fecha de inicio con minutos:", nfhi);

        try {
            let nfhiEnUTC = Fecha.tiempoLocalString_A_UTCString(nfhi);
            env === "dev" && console.log("Actualizando función con fecha UTC:", nfhi, nfhiEnUTC);
            const body = {
                idFuncion: checked ? funcion.codigoFuncion : null,
                fechaHoraInicio: nfhi,
                fechaHoraFin: null,
                dimension: funcion.nuevaDimension,
                precioBase: funcion.nuevoPrecioBase,
                idSede: null,
                nombreSede: null,
                idSala: funcion.nuevaSalaId,
                categoria: null,
                codigoSala: null,
                idPelicula: funcion.nuevaPeliculaId,
                nombrePelicula: null
            }
            const response = checked
                ? await axios.patch(`${backend_url}/api/intranet/v1/funciones`, body, {
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })
                : await axios.post(`${backend_url}/api/intranet/v1/funciones`, body, {
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })

            if (response.status === 200) {
                showToast({ tipo: 'toast-info', titulo: checked ? '¡Función actualizada!' : '¡Función creada!', mensaje: '' });
                if (valoresBusqueda.selectSala) {
                    handleSalaChange({ target: { value: valoresBusqueda.selectSala } });
                } else if (valoresBusqueda.selectPelicula) {
                    handlePeliculaChange({ target: { value: valoresBusqueda.selectPelicula } });
                }

                setFuncion(prev => ({
                    ...prev,
                    funcionElegida: '',
                    codigoFuncion: '',
                    nuevaHoraInicio: '',
                    nuevaFecha: '',
                    nuevaPeliculaId: '',
                    nuevaSalaId: '',
                    nuevaSedeId: '',
                    nuevaDimension: '',
                    nuevoPrecioBase: '0'
                }));
            }

        } catch (error) {
            if (checked && error.response?.status === 400) {
                showToast({ tipo: 'toast-danger', titulo: 'Función no actualizada', mensaje: error.response.data });
                return;
            }
            console.error(error)
            showToast({ tipo: 'toast-danger', titulo: checked ? 'Función no actualizada' : 'Error al crear la función', mensaje: `Horario fuera de rango permitido, cruce detectado${checked ? ", precio base cero o función con entradas vendidas." : " o precio base cero."}` });
        }
    }

    return (
        <div className='d-flex flex-column align-items-center gap-4 m-3 mt-4 p-4 rounded-4 shadow'>
            <div className='d-flex flex-column align-items-center gap-3'>
                <h3 className='d-flex text-nowrap ancizar-sans-regular mb-0'>Módulo ágil de funciones</h3>
                <div className="d-flex align-items-center">
                    <label className="fs-4">{checked === true ?  /*true = actualizar */
                        "Crear" : <strong className="cineagile-blue-600">Crear</strong>}
                    </label>
                    <label className="switch m-2">
                        <input type="checkbox" checked={checked} onChange={(e) => { cambiarEstado(e.target.checked) }} />
                        <span className="slider round"></span>
                    </label>
                    <label className="fs-4">{checked === true ? <strong className="cineagile-blue-600">Actualizar</strong>
                        : "Actualizar"}
                    </label>
                </div>
                <label>Cliquea una función para copiar sus datos</label>
                <div className="d-flex flex-column gap-3">
                    <div className='d-flex w-100 align-items-center'>
                        <label className='d-flex text-nowrap w-100'>Elige sede</label>
                        <select className='form-select w-100' value={funcion.nuevaSedeId}
                            disabled={checked && (funcion.funcionElegida === undefined || funcion.codigoFuncion === '')}
                            onChange={(e) => checked
                                ? setFuncion(prev => ({
                                    ...prev,
                                    nuevaSedeId: e.target.value,
                                    nuevaSalaId: ''
                                })) :
                                setFuncion(prev => ({
                                    ...prev,
                                    nuevaSedeId: e.target.value
                                }))
                            }>
                            <option value='0'>Elija una sede</option>
                            {valoresBusqueda.sedesActivas.map((el, id) => (
                                <option key={el.id || id} value={el.id} >{el.nombre}</option>
                            ))}
                        </select>
                    </div>
                    {checked && <div className='d-flex w-100 align-items-center'>
                        <label className='w-100'>Código de función</label>
                        <input className='form-control w-100' type="text" disabled value={funcion.codigoFuncion}
                            onChange={(e) =>
                                setFuncion(prev => ({ ...prev, codigoFuncion: e.target.value }))
                            } />
                    </div>}
                    <div className='d-flex w-100 align-items-center'>
                        <label className='w-100'>Película</label>
                        <select value={funcion.nuevaPeliculaId}
                            disabled={checked && (funcion.funcionElegida === undefined || funcion.codigoFuncion === '')}
                            className='form-select w-100'
                            onChange={(e) => {
                                setFuncion(prev => ({ ...prev, nuevaPeliculaId: e.target.value }))
                                checked && setFuncion(prev => ({ ...prev, nuevaFecha: '' }))
                            }
                            }>
                            <option value="0">Elige una película</option>
                            {listaPeliculas.map((el, id) => (
                                <option key={el.idPelicula || id} value={el.idPelicula} >{el.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex w-100 align-items-center'>
                        <label className='w-100'>Fecha</label>
                        <input className='form-control w-100' type="date" value={funcion.nuevaFecha} onKeyDown={(e) => e.preventDefault()}
                            disabled={checked ? (funcion.funcionElegida === undefined || funcion.codigoFuncion === '')
                                : (funcion.nuevaPeliculaId == '' || funcion.nuevaPeliculaId == 0)}
                            min={(funcion.nuevaPeliculaId != '' && funcion.nuevaPeliculaId != '0') ?
                                (new Date(listaPeliculas.find(item => item.idPelicula == funcion.nuevaPeliculaId)?.fechaInicioEstreno) > new Date(fechaReal) ?
                                    listaPeliculas.find(item => item.idPelicula == funcion.nuevaPeliculaId).fechaInicioEstreno : format(fechaReal, "yyyy-MM-dd"))
                                : ''}
                            onChange={(e) => setFuncion(prev => ({ ...prev, nuevaFecha: e.target.value }))} />
                    </div>
                    <div className='d-flex w-100 align-items-center'>
                        <span className='w-100'>Hora de inicio<br></br><span style={{ fontSize: "0.9rem" }}>(formato según dispositivo)</span></span>
                        <input className='form-control w-100' type="time"
                            disabled={checked ? (funcion.funcionElegida === undefined || funcion.codigoFuncion === '')
                                : (funcion.nuevaPeliculaId == '' || funcion.nuevaPeliculaId == 0)}
                            value={funcion.nuevaHoraInicio}
                            onChange={(e) =>
                                setFuncion(prev => ({
                                    ...prev,
                                    nuevaHoraInicio: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div className='d-flex w-100 align-items-center'>
                        <span className='w-100'>Sala</span>
                        <select value={funcion.nuevaSalaId}
                            className='form-select w-100'
                            disabled={checked && (funcion.funcionElegida === undefined || funcion.codigoFuncion === '')}
                            onChange={(e) => setFuncion(prev => ({
                                ...prev,
                                nuevaSalaId: e.target.value
                            }))
                            }>
                            <option value="">Elige una sala</option>
                            {salasNuevaSede.map((el, id) => (
                                <option key={el.id || id} value={el.id} >{el.codigoSala}</option>
                            ))}
                        </select>
                    </div>


                    <div className='d-flex w-100 align-items-center'>
                        <label className='w-100'>Dimensión</label>
                        <select value={funcion.nuevaDimension}
                            disabled={checked && (funcion.funcionElegida === undefined || funcion.codigoFuncion === '')}
                            className='form-select w-100'
                            onChange={(e) =>
                                setFuncion(prev => ({
                                    ...prev,
                                    nuevaDimension: e.target.value
                                }))
                            }>
                            <option value="0">Elige dimensión</option>
                            {['2D', '3D'].map((el, id) => (
                                <option key={id} value={el} >{el}</option>
                            ))}
                        </select>
                    </div>

                    <div className='d-flex w-100 align-items-center'>
                        <label className='w-100'>Precio base</label>
                        <input value={funcion.nuevoPrecioBase} step="0.1" min="0"
                            disabled={checked && (funcion.funcionElegida === undefined || funcion.codigoFuncion === '')}
                            className='form-control w-100' type="number"
                            onChange={(e) => {
                                const input = e.target.value;
                                const regex = /^\d*\.?\d{0,1}$/; // hasta 1 decimal
                                if (input === "" || regex.test(input)) {
                                    setFuncion(prev => ({
                                        ...prev,
                                        nuevoPrecioBase: e.target.value
                                    }))
                                };
                            }
                            } />
                    </div>

                    <button className='btn btn-primary btn-primary-gradient' onClick={(e) => { e.preventDefault(); enviarFuncion() }}>
                        {checked ? "Actualizar" : "Crear"}</button>
                </div>
            </div>
        </div >

    )
};
export default ModuloFuncion