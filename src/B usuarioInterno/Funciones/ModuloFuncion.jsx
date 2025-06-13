import { useContext, useState, useEffect } from "react";
import { FuncionesContext } from "./FuncionesContext";
import Loading from '../../0 componentesGenerales/Loading';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Cookies from 'js-cookie';
import { format } from "date-fns";
import './ModuloFuncion.css'
import SalaButaca from '../../servicios/SalaButaca';


const ModuloFuncion = ({ handlePeliculaChange, handleSalaChange }) => {
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
            consultarPeliculas()
        } else {
            setPrimeraVez(false);
        }
    }, [primeraVez])

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
            const datos = (await axios.get(`${url}/intranet/peliculas`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setListaPeliculas(datos.sort(ordenamientoAlfa));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (funcion.nuevaSedeId !== '') {

            SalaButaca.salasPorSede(funcion.nuevaSedeId)
                .then(data =>
                    setSalasNuevaSede(data)
                )
                .catch(err => console.error("Error al obtener salas por sede:", err));
        }

    }, [funcion.nuevaSedeId])

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
                alert("La función no tiene una fecha de inicio válida");
                return;
            }

        })
        //console.log(funcion.nuevaSalaId, funcion.nuevaPeliculaId)
        //console.log(funcion.funcionElegida)

        try {
            //console.log("Actualizando función con código:", funcion.codigoFuncion);
            //console.log("Nueva fecha y hora de inicio:", nfhi);
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
                alert("¡Función editada!")
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
                    codigoSala: '',
                    nuevaPeliculaId: '',
                    nuevaSalaId: '',
                    nuevaSedeId: ''
                }));
            }
        } catch (error) {
            console.error("Error al actualizar la función:", error);
        }
    }

    const crearFuncion = async () => {
        let nfhi;
        if (!funcion.nuevaHoraInicio) {
            alert("Debe ingresar una nueva hora de inicio");
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
            //console.log("Actualizando función con código:", funcion.codigoFuncion);
            console.log("Nueva fecha y hora de inicio:", nfhi);
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
                alert("¡Función creada!")
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
                    codigoSala: '',
                    nuevaPeliculaId: '',
                    nuevaSalaId: '',
                    nuevaSedeId: '',
                    nuevaDimension: '',
                    nuevoPrecioBase: 0
                }));
            }
        } catch (error) {
            console.error("Error al crear la función:", error);
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
                        <label className="switch m-2">
                            <input type="checkbox" checked={checked} onChange={(e) => { cambiarEstado(e.target.checked) }} />
                            <span className="slider round"></span>
                        </label>
                        {checked === true ?
                            <label className="fs-4"><strong style={{ "color": "#01217B" }}>Actualizar</strong></label>
                            :
                            <label className="fs-4">Actualizar</label>}
                    </div>
                    {checked === true ?
                        funcion.funcionElegida === undefined || funcion.codigoFuncion === '' ?
                            /*deshabilitado */
                            <div className="d-flex flex-column gap-3">
                                <label>Cliquea una función para copiar sus datos</label>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='d-flex text-nowrap w-100'>Elige sede</label>
                                    <select className='form-select w-100' disabled>
                                        <option value="">Elige una sede</option>
                                    </select>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Código de función</label>
                                    <input className='form-control w-100' disabled type="text" value=''/>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva fecha</label>
                                    <input className='form-control w-100' disabled type="date" value=''/>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva hora de inicio (formato 24h)</label>
                                    <input className='form-control w-100' disabled type="time" value=''/>
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

                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Dimensión</label>
                                    <select value='' className='form-select w-100' disabled>
                                        <option value="0">Elige una dimensión</option>
                                    </select>
                                </div>

                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Precio base</label>
                                    <input value='0' step="0.1" min="0" className='form-control w-100' type="number" disabled/>
                                </div>

                                <button className='btn btn-primary' disabled >Actualizar</button>
                            </div>
                            :
                            /*luego de cliquear */
                            <div className="d-flex flex-column gap-3">
                                <label>Cliquea una función para copiar sus datos</label>
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
                                        {valoresBusqueda.sedes.map((el, id) => (
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
                                        }/>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva fecha</label>
                                    <input className='form-control w-100' type="date" value={funcion.nuevaFecha}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                nuevaFecha: e.target.value
                                            }))
                                        }/>
                                </div>
                                <div className='d-flex w-100 align-items-center'>
                                    <label className='w-100'>Nueva hora de inicio (formato 24h)</label>
                                    <input className='form-control w-100' type="time" value={funcion.nuevaHoraInicio}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                nuevaHoraInicio: e.target.value
                                            }))
                                        }/>
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
                                    <label className='w-100'>Pelicula</label>
                                    <select value={funcion.nuevaPeliculaId}
                                        className='form-select w-100'
                                        onChange={(e) =>
                                            setFuncion(prev => ({
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
                                        }/>
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
                                <select className='form-select w-100'
                                    onChange={(e) =>
                                        setFuncion(prev => ({
                                            ...prev,
                                            nuevaSedeId: e.target.value
                                        }))
                                    }>
                                    <option value='0'>Elija una sede</option>
                                    {valoresBusqueda.sedes.map((el, id) => (
                                        <option key={el.id || id} value={el.id} >{el.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='d-flex w-100 align-items-center'>
                                <label className='w-100'>Nueva fecha</label>
                                <input className='form-control w-100' type="date" value={funcion.nuevaFecha}
                                    onChange={(e) =>
                                        setFuncion(prev => ({
                                            ...prev,
                                            nuevaFecha: e.target.value
                                        }))
                                    }/>
                            </div>
                            <div className='d-flex w-100 align-items-center'>
                                <label className='w-100'>Nueva hora de inicio (formato 24h)</label>
                                <input className='form-control w-100' type="time" value={funcion.nuevaHoraInicio}
                                    onChange={(e) =>
                                        setFuncion(prev => ({
                                            ...prev,
                                            nuevaHoraInicio: e.target.value
                                        }))
                                    }/>
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
                                    }/>
                            </div>

                            <button className='btn btn-primary' onClick={(e) => {
                                e.preventDefault();
                                crearFuncion()
                            }}>Crear</button>
                        </div>
                    }
                </div>
            </div >
            :
            <></>
    )
};
export default ModuloFuncion