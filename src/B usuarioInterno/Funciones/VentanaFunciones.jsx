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
import ModuloFuncion from './ModuloFuncion';
import Fecha from '../../servicios/Fecha';
import Funcion from '../../servicios/Funcion';

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
        setListaFunciones,
        listaPeliculas,
        setListaPeliculas,
        salasNuevaSede,
        setSalasNuevaSede
    } = useContext(FuncionesContext);

    useEffect(() => {
        console.log("Funcion:", funcion.funcionElegida);
        if (funcion.funcionElegida) {
            const fhi = new Date(funcion.funcionElegida.fechaHoraInicio);

            setFuncion(prev => ({
                ...prev,
                codigoFuncion: funcion.funcionElegida.idFuncion,
                nuevaFecha: format(fhi, "yyyy-MM-dd"),
                nuevaHoraInicio: format(fhi, "HH:mm"),
                nuevaSalaId: valoresBusqueda.salasSede.find(el => el.codigoSala === funcion.funcionElegida.codigoSala)?.id,
                nuevaPeliculaId: listaPeliculas.find(el => el.idPelicula === funcion.funcionElegida.idPelicula)?.idPelicula,
                nuevaSedeId: valoresBusqueda.sedes.find(el => el.id === funcion.funcionElegida.idSede)?.id,
                nuevaDimension: funcion.funcionElegida.dimension,
                nuevoPrecioBase: funcion.funcionElegida.precioBase
            }));
        } else {
            setFuncion(prev => ({
                ...prev,
                funcionElegida: '',
                codigoFuncion: '',
                nuevaFecha: '',
                nuevaHoraInicio: '',
                nuevaSalaId: '',
                nuevaPeliculaId: '',
                nuevaSedeId: '',
                nuevaDimension: '',
                nuevoPrecioBase: 0
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
        setFuncion(prev => ({
            ...prev,
            funcionElegida: '',
            codigoFuncion: '',
            nuevaFecha: '',
            nuevaHoraInicio: '',
            nuevaSalaId: '',
            nuevaPeliculaId: '',
            nuevaSedeId: '',
            nuevaDimension: '',
            nuevoPrecioBase: 0
        }));
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



    const handlePeliculaChange = async (e) => {
        const peliculaId = e.target.value;
        if (peliculaId) {
            setValoresBusqueda(prev => ({
                ...prev,
                selectSala: '',
                selectPelicula: peliculaId
            }));

            const fechaElegidaUTC = Fecha.tiempoLocalString_A_UTCString(`${valoresBusqueda.fechaElegida}T00:00:00`);

            try {
                const funciones = (await axios.get(`${url}/intranet/buscarFuncionesPorSemanaConPelicula`, {
                    params: {
                        idPelicula: peliculaId,
                        fecha: fechaElegidaUTC, //(new Date(`${valoresBusqueda.fechaElegida}T00:00:00Z`)).toISOString(),
                        idSede: valoresBusqueda.sedeElegida
                    },
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })).data;

                Funcion.funcionesUTC_A_local(funciones);
                setListaFunciones(funciones);
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
                selectPelicula: ''
            }));

            const fechaElegidaUTC = Fecha.tiempoLocalString_A_UTCString(`${valoresBusqueda.fechaElegida}T00:00:00`);

            try {
                const funciones = (await axios.get(`${url}/intranet/buscarFuncionesPorSemanaConSala`, {
                    params: {
                        idSala: salaId,
                        fecha: fechaElegidaUTC, //`${valoresBusqueda.fechaElegida}T00:00:00`,
                        idSede: valoresBusqueda.sedeElegida
                    },
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })).data;

                Funcion.funcionesUTC_A_local(funciones);
                setListaFunciones(funciones);
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

                    <ModuloFuncion handlePeliculaChange={handlePeliculaChange} handleSalaChange={handleSalaChange}></ModuloFuncion>

                </div>


            </div>
            {
                listaFunciones.length > 0 ?
                    <Cronograma />
                    : <div className='d-flex justify-content-center align-items-center m-4'>
                        <h3>No hay funciones para mostrar</h3>
                    </div>
            }

        </div >
    )
}

export default VentanaFunciones;