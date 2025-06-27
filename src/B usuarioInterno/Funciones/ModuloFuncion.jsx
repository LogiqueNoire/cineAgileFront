import { useContext, useState, useEffect } from "react";
import { FuncionesContext } from "./FuncionesContext";
import Loading from '../../0 componentesGenerales/Loading';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Cookies from 'js-cookie';
import { format, isBefore } from "date-fns";
import './ModuloFuncion.css'
import SalaButaca from '../../servicios/SalaButaca';
import Toast from '../../Toast'

import Fecha from "../../servicios/Fecha";

const ModuloFuncion = ({ handlePeliculaChange, handleSalaChange }) => {
    const [toast, setToast] = useState({ tipo: '', visible: false, titulo: '', mensaje: '' });

    const [loading, setLoading] = useState(true);
    const {
        valoresBusqueda,
        setValoresBusqueda,
        funcion,
        setFuncion,
        listaFunciones,
        setListaFunciones,
        listaPeliculas,
        setListaPeliculas,
        salasNuevaSede,
        setSalasNuevaSede
    } = useContext(FuncionesContext);

    const [checked, setChecked] = useState(true)

    const [primeraVez, setPrimeraVez] = useState(true)

    useEffect(() => {
        if (primeraVez) {
            obtenerFecha();
            consultarPeliculas()
        } else {
            setPrimeraVez(false);
        }
    }, [primeraVez])

    const onFechaChange = (e) => {
        const { name, value } = e.target;

        setPelicula({
            ...pelicula,
            [name]: value ? new Date(`${value}T00:00`) : null,
        });
    };

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
    let response
    const obtenerFecha = async () => {
        try {
            response = await axios.get(`${url}/fecha-actual`);
            setFechaReal(new Date(response.data));

        } catch (err) {
            console.error("Error al obtener la fecha:", err);
        }
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

    const ordenamientoAlfa = (a, b) => {
        const x = a.nombre.toLowerCase();
        const y = b.nombre.toLowerCase();

        return x < y ? -1 : 1;
    }

    const consultarPeliculas = async () => {
        try {
            const datos = (await axios.get(`${url}/intranet/soloPeliculas`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setListaPeliculas(datos.sort(ordenamientoAlfa));
        } catch (error) {
            console.error(error);
        }
        finally {
            console.log('hola')
        }
    }

    useEffect(() => {
        if (funcion.nuevaSedeId !== '') {

            SalaButaca.salasPorSede(funcion.nuevaSedeId)
                .then(data =>
                    setSalasNuevaSede(data)
                )
                .catch(err => console.error("Error al obtener salas por sede:", err));

        } else {
            setFuncion(prev => ({
                ...prev,
                nuevaSalaId: '0'
            }))

        }

    }, [funcion.nuevaSedeId])

    const actualizarFuncion = async () => {
        let nfhi;
        console.log("funcion a editar", funcion)
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


            setToast({
                tipo: 'toast-danger',
                visible: true,
                titulo: '¡Cuidado!',
                mensaje: 'Faltan datos obligatorios o son incorrectos.'
            });
            setTimeout(() => setToast({ visible: false }), 3000);
            return;
        }

        listaFunciones.map((el) => {
            if (el.idFuncion === Number(funcion.codigoFuncion)) {
                const [horaRef, minutoRef] = funcion.nuevaHoraInicio.split(':').map(Number);
                if ((new Date(el.fechaHoraInicio)).getHours() === horaRef && (new Date(el.fechaHoraInicio)).getMinutes() === minutoRef
                    && funcion.nuevaFecha === '') {
                    setToast({
                        tipo: 'toast-danger',
                        visible: true,
                        titulo: '¡Cuidado!',
                        mensaje: 'La hora de inicio es la misma que la actual'
                    });
                    setTimeout(() => setToast({ visible: false }), 3000);
                    return;
                } else {
                    if (funcion.nuevaFecha !== '') {
                        // Si se ha proporcionado una nueva fecha, combinarla con la nueva hora
                        const [anio, mes, dia] = funcion.nuevaFecha.split('-').map(Number);
                        nfhi = new Date(anio, mes - 1, dia);
                        //console.log("Nueva fecha:", funcion.nuevaFecha);
                        //console.log("Nueva fecha h i:", nfhi);
                        nfhi.setHours(funcion.nuevaHoraInicio.split(':')[0]);
                        nfhi.setMinutes(funcion.nuevaHoraInicio.split(':')[1]);
                    }
                    nfhi.setHours(funcion.nuevaHoraInicio.split(':')[0]);
                    nfhi.setMinutes(funcion.nuevaHoraInicio.split(':')[1]);
                    //formatear
                    nfhi = format(nfhi, "yyyy-MM-dd'T'HH:mm:ss");
                    //console.log("Nueva fecha de inicio con minutos:", nfhi);
                }
            }

            if (!el.fechaHoraInicio) {
                setToast({
                    tipo: 'toast-danger',
                    visible: true,
                    titulo: '¡Cuidado!',
                    mensaje: 'La función no tiene una fecha de inicio válida'
                });
                setTimeout(() => setToast({ visible: false }), 3000);
                return;
            }

        })
        //console.log(funcion.nuevaSalaId, funcion.nuevaPeliculaId)
        //console.log(funcion.funcionElegida)

        try {
            //console.log("Actualizando función con código:", funcion.codigoFuncion);
            //console.log("Nueva fecha y hora de inicio:", nfhi);
            let nfhiEnUTC = Fecha.tiempoLocalString_A_UTCString(nfhi);

            const response = await axios.patch(`${url}/intranet/actualizarFuncion`, {
                idFuncion: funcion.codigoFuncion,
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
            }, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

            if (response.status === 200) {
                setToast({
                    tipo: 'toast-info',
                    visible: true,
                    titulo: '¡Función editada!',
                    mensaje: ''
                });
                setTimeout(() => setToast({ visible: false }), 3000);
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
                    nuevaSedeId: ''
                }));
            }
            if (response.status === 400) {
                setToast({
                    tipo: 'toast-danger',
                    visible: true,
                    titulo: 'Función no actualizada',
                    mensaje: response.data
                });
            }
        } catch (error) {
            setToast({
                tipo: 'toast-danger',
                visible: true,
                titulo: 'Función no actualizada',
                mensaje: 'Horario fuera de rango permitido, cruce detectado o función con entradas vendidas'
            });
            setTimeout(() => setToast({ visible: false }), 3000);
        }
    }

    const crearFuncion = async () => {
        let nfhi;
        console.log("funcion a editar", funcion)
        console.log("fecha real", fechaReal)
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

            setToast({
                tipo: 'toast-danger',
                visible: true,
                titulo: '¡Cuidado!',
                mensaje: 'Faltan datos o error en los datos'
            });
            setTimeout(() => setToast({ visible: false }), 3000);
            return;
        }

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
        //console.log("Nueva fecha de inicio con minutos:", nfhi);

        //console.log(funcion.nuevaSalaId, funcion.nuevaPeliculaId)
        console.log(funcion)

        try {
            let nfhiEnUTC = Fecha.tiempoLocalString_A_UTCString(nfhi);
            console.log("Actualizando función con fecha UTC:", nfhi, nfhiEnUTC);
            const response = await axios.post(`${url}/intranet/crearFuncion`, {
                idFuncion: null,
                fechaHoraInicio: nfhi,
                fechaHoraFin: null,
                dimension: funcion.nuevaDimension, //dimension 
                precioBase: funcion.nuevoPrecioBase,
                idSede: null,
                nombreSede: null,
                idSala: funcion.nuevaSalaId,
                categoria: null,
                codigoSala: null,
                idPelicula: funcion.nuevaPeliculaId,
                nombrePelicula: null
            }, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

            if (response.status === 200) {
                setToast({
                    tipo: 'toast-info',
                    visible: true,
                    titulo: '¡Función creada!',
                    mensaje: ''
                });
                setTimeout(() => setToast({ visible: false }), 3000);
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
                    nuevoPrecioBase: 0
                }));
            }
        } catch (error) {
            setToast({
                tipo: 'toast-danger',
                visible: true,
                titulo: 'Error al crear la función',
                mensaje: 'Horario fuera de rango permitido o cruce detectado'
            });
            setTimeout(() => setToast({ visible: false }), 3000);

        }
    }




    return (

        <div className='d-flex flex-column align-items-center gap-4 m-3 border p-4 rounded'>
            <div className='d-flex flex-column align-items-center gap-3'>
                <h3 className='d-flex text-nowrap'>Módulo ágil de funciones</h3>
                <div className="d-flex align-items-center">
                    {checked === true ?  /*true = actualizar */
                        <label className="fs-4">Crear</label>
                        :
                        <label className="fs-4"><strong style={{ "color": "#01217B" }}>Crear</strong></label>
                    }
                    <label className="switch m-2">
                        <input type="checkbox" checked={checked} onChange={(e) => { cambiarEstado(e.target.checked) }} />
                        <span className="slider round"></span>
                    </label>
                    {checked === true ?
                        <label className="fs-4"><strong style={{ "color": "#01217B" }}>Actualizar</strong></label>
                        :
                        <label className="fs-4">Actualizar</label>}
                </div>
                <label>Cliquea una función para copiar sus datos</label>
                {checked === true ?
                    <div className="d-flex flex-column gap-3">
                        <div className='d-flex w-100 align-items-center'>
                            <label className='d-flex text-nowrap w-100'>Elige sede</label>
                            <select className='form-select w-100'
                                disabled={funcion.funcionElegida === undefined || funcion.codigoFuncion === ''}
                                value={funcion.nuevaSedeId}
                                onChange={(e) =>
                                    setFuncion(prev => ({
                                        ...prev,
                                        nuevaSedeId: e.target.value,
                                        nuevaSalaId: ''
                                    }))
                                }>
                                <option value='0'>Elija una sede</option>
                                {valoresBusqueda.sedesActivas.map((el, id) => (
                                    <option key={el.id || id} value={el.id} >{el.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className='d-flex w-100 align-items-center'>
                            <label className='w-100'>Código de función</label>
                            <input className='form-control w-100' type="text" disabled value={funcion.codigoFuncion}
                                onChange={(e) =>
                                    setFuncion(prev => ({
                                        ...prev,
                                        codigoFuncion: e.target.value
                                    }))
                                } />
                        </div>
                        <div className='d-flex w-100 align-items-center'>
                            <label className='w-100'>Pelicula</label>
                            <select value={funcion.nuevaPeliculaId}
                                disabled={funcion.funcionElegida === undefined || funcion.codigoFuncion === ''}
                                className='form-select w-100'
                                onChange={(e) => {
                                    setFuncion(prev => ({
                                        ...prev,
                                        nuevaPeliculaId: e.target.value
                                    }))
                                    setFuncion(prev => ({
                                        ...prev,
                                        nuevaFecha: ''
                                    }))
                                }
                                }>
                                <option value="0">Elige una película</option>
                                {listaPeliculas.map((el, id) => (
                                    <option key={el.idPelicula || id} value={el.idPelicula} >{el.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className='d-flex w-100 align-items-center'>
                            <label className='w-100'>Nueva fecha</label>
                            <input className='form-control w-100' type="date" onKeyDown={(e) => e.preventDefault()}
                                disabled={funcion.funcionElegida === undefined || funcion.codigoFuncion === ''}
                                value={funcion.nuevaFecha}
                                min={(funcion.nuevaPeliculaId != '' && funcion.nuevaPeliculaId != '0') ?
                                    (new Date(listaPeliculas.find(item => item.idPelicula == funcion.nuevaPeliculaId).fechaInicioEstreno) > new Date(fechaReal) ?
                                        listaPeliculas.find(item => item.idPelicula == funcion.nuevaPeliculaId).fechaInicioEstreno : format(fechaReal, "yyyy-MM-dd"))
                                    : ''}
                                onChange={(e) =>
                                    setFuncion(prev => ({
                                        ...prev,
                                        nuevaFecha: e.target.value
                                    }))
                                } />
                        </div>
                        <div className='d-flex w-100 align-items-center'>
                            <label className='w-100'>Nueva hora de inicio<br></br>(formato según dispositivo)</label>
                            <input className='form-control w-100' type="time"
                                disabled={funcion.funcionElegida === undefined || funcion.codigoFuncion === ''}
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
                            <label className='w-100'>Sala</label>

                            <select value={funcion.nuevaSalaId}
                                className='form-select w-100'
                                disabled={funcion.funcionElegida === undefined || funcion.codigoFuncion === ''}
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
                                disabled={funcion.funcionElegida === undefined || funcion.codigoFuncion === ''}
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
                                disabled={funcion.funcionElegida === undefined || funcion.codigoFuncion === ''}
                                className='form-control w-100' type="number"
                                onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^\d*\.?\d{0,1}$/; // permite hasta 1 decimal
                                    if (input === "" || regex.test(input)) {
                                        setFuncion(prev => ({
                                            ...prev,
                                            nuevoPrecioBase: e.target.value
                                        }))
                                    };
                                }
                                } />
                        </div>

                        <button className='btn btn-primary' onClick={(e) => {
                            e.preventDefault();
                            actualizarFuncion()
                        }}>Actualizar</button>
                    </div>
                    :
                    /*Crear */
                    <div className="d-flex flex-column gap-3">
                        <div className='d-flex w-100 align-items-center'>
                            <label className='d-flex text-nowrap w-100'>Elige sede</label>
                            <select className='form-select w-100' value={funcion.nuevaSedeId}
                                onChange={(e) =>
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
                        <div className='d-flex w-100 align-items-center'>
                            <label className='w-100'>Pelicula</label>

                            <select value={funcion.nuevaPeliculaId}
                                className='form-select w-100'
                                onChange={
                                    (e) => setFuncion(prev => ({
                                        ...prev,
                                        nuevaPeliculaId: e.target.value
                                    }))
                                }>
                                <option value="0">Elige una película</option>
                                {listaPeliculas.map((el, id) => (
                                    <option key={el.idPelicula || id} value={el.idPelicula} >{el.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className='d-flex w-100 align-items-center'>
                            <label className='w-100'>Nueva fecha</label>
                            <input className='form-control w-100' type="date" value={funcion.nuevaFecha} onKeyDown={(e) => e.preventDefault()}
                                disabled={funcion.nuevaPeliculaId == '' || funcion.nuevaPeliculaId == 0}
                                min={(funcion.nuevaPeliculaId != '' && funcion.nuevaPeliculaId != '0') ?
                                    (new Date(listaPeliculas.find(item => item.idPelicula == funcion.nuevaPeliculaId).fechaInicioEstreno) > new Date(fechaReal) ?
                                        listaPeliculas.find(item => item.idPelicula == funcion.nuevaPeliculaId).fechaInicioEstreno : format(fechaReal, "yyyy-MM-dd"))
                                    : ''}
                                onChange={(e) =>
                                    setFuncion(prev => ({
                                        ...prev,
                                        nuevaFecha: e.target.value
                                    }))
                                } />
                        </div>
                        <div className='d-flex w-100 align-items-center'>
                            <label className='w-100'>Nueva hora de inicio<br></br>(formato según sistema)</label>
                            <input className='form-control w-100' type="time"
                                disabled={funcion.nuevaPeliculaId == '' || funcion.nuevaPeliculaId == 0}
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
                            <label className='w-100'>Sala</label>

                            <select value={funcion.nuevaSalaId}
                                className='form-select w-100'
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
                                className='form-control w-100' type="number"
                                onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^\d*\.?\d{0,1}$/; // permite hasta 1 decimal
                                    if (input === "" || regex.test(input)) {
                                        setFuncion(prev => ({
                                            ...prev,
                                            nuevoPrecioBase: e.target.value
                                        }))
                                    };
                                }
                                } />
                        </div>

                        <button className='btn btn-primary' onClick={(e) => {
                            e.preventDefault();
                            crearFuncion()
                        }}>Crear</button>
                    </div>
                }
            </div>
            <Toast tipo={toast.tipo}
                titulo={toast.titulo}
                mensaje={toast.mensaje}
                visible={toast.visible} />
        </div >

    )
};
export default ModuloFuncion