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
import ActualizarFuncion from './ActualizarFuncion';

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
                selectPelicula: ''
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

                    <ActualizarFuncion handlePeliculaChange={handlePeliculaChange} handleSalaChange={handleSalaChange}></ActualizarFuncion>
                    
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