import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Cookies from 'js-cookie';
import { se } from 'date-fns/locale';
import { set } from 'date-fns';
import SalaButaca from '../../servicios/SalaButaca';
import Pelicula from '../../servicios/Pelicula';
import Cronograma from './Cronograma';
import { format } from 'date-fns'
import { FuncionesContext } from './FuncionesContext';
import BuscarFunciones from './BuscarFunciones';

const ordenamientoAlfa = (a, b) => {
    const x = a.nombre.toLowerCase();
    const y = b.nombre.toLowerCase();

    return x < y ? -1 : 1;
}

const VentanaFunciones = () => {
    const [loading, setLoading] = useState(true);

    const {
        valoresBusqueda,
        setValoresBusqueda,
        funcion,
        setFuncion,
        listaFunciones,
        setListaFunciones
    } = useContext(FuncionesContext);

    useEffect(() => {
        console.log("Funcion:", funcion.funcionElegida);
        if (funcion.funcionElegida) {
            const fhi = new Date(funcion.funcionElegida.fechaHoraInicio);

            setFuncion(prev => ({
                ...prev,
                codigoFuncion: funcion.funcionElegida.idFuncion,
                nuevaFecha: format(fhi, "yyyy-MM-dd"),
                nuevaHoraInicio: format(fhi, "HH:mm")
            }));
        } else {
            setFuncion(prev => ({
                ...prev,
                codigoFuncion: '',
                nuevaFecha: '',
                nuevaFechaHoraInicio: ''
            }));
        }
    }, [funcion.funcionElegida]);

    useEffect(() => {
        setValoresBusqueda(prev => ({
            ...prev,
            selectSala: '',
            selectPelicula: '',
            filtro: ''
        }));
        setListaFunciones([]);
    }, [valoresBusqueda.sedeElegida, valoresBusqueda.fechaElegida])

    useEffect(() => {
        if (valoresBusqueda.sedeElegida !== '') {
            Pelicula.mostrarPeliculasPorSede(valoresBusqueda.sedeElegida)
                .then(data =>
                    setValoresBusqueda(prev => ({
                        ...prev,
                        peliculasSede: data.sort(ordenamientoAlfa)
                    }))
                )
                .catch(err => console.error("Error al obtener peliculas por sede:", err));

            SalaButaca.salasPorSede(valoresBusqueda.sedeElegida)
                .then(data =>
                    setValoresBusqueda(prev => ({
                        ...prev,
                        salasSede: data
                    }))
                )
                .catch(err => console.error("Error al obtener salas por sede:", err));
        }
    }, [valoresBusqueda.sedeElegida])

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
                codigoSala: null,
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
                    nuevaFecha: ''
                }));
            }
        } catch (error) {
            console.error("Error al actualizar la función:", error);
        }
    }

    const handlePeliculaChange = async (e) => {
        const peliculaId = e.target.value;
        if (peliculaId) {
            setValoresBusqueda(prev => ({
                ...prev,
                selectSala: '',
                selectPelicula: peliculaId
            }));

            try {
                setListaFunciones((await axios.get(`${url}/intranet/buscarFuncionesPorSemanaConPelicula`, {
                    params: {
                        idPelicula: peliculaId,
                        fecha: `${valoresBusqueda.fechaElegida}T00:00:00`,
                        idSede: valoresBusqueda.sedeElegida
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
        if (salaId) {
            setValoresBusqueda(prev => ({
                ...prev,
                selectSala: salaId,
                selectPelicula: 'peliculaId'
            }));

            try {
                setListaFunciones((await axios.get(`${url}/intranet/buscarFuncionesPorSemanaConSala`, {
                    params: {
                        idSala: salaId,
                        fecha: `${valoresBusqueda.fechaElegida}T00:00:00`,
                        idSede: valoresBusqueda.sedeElegida
                    },
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })).data);
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <div>
            <div className='d-flex flex-column align-items-center'>

                <div className='d-flex flex-wrap justify-content-center gap-4'>
                    <BuscarFunciones handlePeliculaChange={handlePeliculaChange} handleSalaChange={handleSalaChange}></BuscarFunciones>

                    {listaFunciones.length > 0 ?
                        <div className='d-flex flex-column align-items-center gap-4 m-3 border p-4 rounded'>
                            <div className='d-flex flex-column align-items-center gap-3'>
                                <h3 className='d-flex text-nowrap'>Módulo ágil de actualización</h3>
                                <label>Clickea una función para copiar sus datos</label>
                                <div className='d-flex w-100'>
                                    <label className='w-100'>Código de función</label>
                                    <input className='form-control w-100' type="text" value={funcion.codigoFuncion}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                codigoFuncion: e.target.value
                                            }))
                                        }></input>
                                </div>
                                <div className='d-flex w-100'>
                                    <label className='w-100'>Nueva fecha</label>
                                    <input className='form-control w-100' type="date" value={funcion.nuevaFecha}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                nuevaFecha: e.target.value
                                            }))
                                        }></input>
                                </div>
                                <div className='d-flex w-100'>
                                    <label className='w-100'>Nueva hora de inicio</label>
                                    <input className='form-control w-100' type="time" value={funcion.nuevaHoraInicio}
                                        onChange={(e) =>
                                            setFuncion(prev => ({
                                                ...prev,
                                                nuevaHoraInicio: e.target.value
                                            }))
                                        }></input>
                                </div>

                                <button className='btn btn-primary' onClick={(e) => {
                                    e.preventDefault();
                                    actualizarFuncion()
                                }}>Actualizar</button>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>


            </div>
            {
                listaFunciones.length > 0 ?
                    <Cronograma/>
                    : <div className='d-flex justify-content-center align-items-center m-4'>
                        <h3>No hay funciones para mostrar</h3>
                    </div>
            }

        </div >
    )
}

export default VentanaFunciones;