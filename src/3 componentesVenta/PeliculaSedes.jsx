import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MostrarSedesHorarios from "./MostrarSedesHorarios";
import { format } from 'date-fns';
import Pelicula from "../servicios/Pelicula";
import Loading from "../0 componentesGenerales/Loading";
import axios from "axios";
import { url } from "../configuracion/backend"
import { differenceInCalendarDays } from "date-fns";
import { es } from 'date-fns/locale';

import '../1 componentesCartelera/FilmCard.css';

const PeliculaSedes = () => {
    const location = useLocation();
    const { consultaIdPelicula } = location.state || {};

    const [fechaReal, setFechaReal] = useState(null);
    const [fechaElegida, setFechaElegida] = useState(null);
    const [pelicula, setPelicula] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!consultaIdPelicula) return;
        Pelicula.mostrarPelicula(consultaIdPelicula)
            .then(data => setPelicula(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));

        return () => {
            setError(null);
            setLoading(true);
        };
    }, [consultaIdPelicula]);

    /*****Logica fecha******/
    let response
    useEffect(() => {
        const obtenerFecha = async () => {
            try {
                response = await axios.get(`${url}/fecha-actual`);
                setFechaReal(new Date(response.data));

            } catch (err) {
                console.error("Error al obtener la fecha:", err);
            }
        };

        obtenerFecha();
    }, []);

    useEffect(() => {
        setFechaElegida(fechaReal)
        console.log("respuesta fecha", fechaReal)
        console.log("format fecha", format(new Date(fechaReal), `yyyy-MM-dd`))
    }, [fechaReal])


    const onFechaChange = (e) => {
        setFechaElegida(new Date(`${e.target.value}T00:00`));
    };

    if (loading || !fechaReal) {
        return <div className="d-flex justify-content-center"><Loading /></div>;
    }

    /*********** */

    if (error) {
        return <h1>Error cargando datos</h1>;
    }

    return (
        <div>
            <div className="d-flex justify-content-start flex-wrap flex-sm-wrap flex-md-nowrap gap-4 align-items-center px-5 py-4 bg-light bg-gradient border shadow mb-4">
                <img className="card col-12 col-sm-11 col-md-6 col-lg-2 shadow rounded img-film-card2" style={{ minHeight: "350px", aspectRatio: "3/5" }} src={pelicula.imageUrl} alt="imagen Peli" />
                <div>
                    <div className="d-flex flex-column gap-2">

                        <h1 className="display-4" style={{ color: '#0A2B9C' }}><strong>{pelicula.nombre}</strong></h1>
                        <h5 style={{ color: '#01217B' }}>{`${pelicula.clasificacion} | ${pelicula.genero.map(g => g.nombre).join(', ')}`}</h5>
                        <div>
                            <p>{`Sinopsis`}</p>
                            <p>{pelicula.sinopsis}</p>
                        </div>
                        <h5>{`Director. ${pelicula.director}`}</h5>
                        <h5>{`Actores principales. ${pelicula.actores}`}</h5>
                    </div>

                    {differenceInCalendarDays(pelicula.fechaInicioEstreno, fechaReal) < 8 ?

                        <div className='mt-5'>
                            <h5 className='my-2'>Opciones</h5>
                            <div>
                                <span className="me-2">Selecciona una fecha:</span>
                                <input
                                    type="date"
                                    className="mx-1 form-control"
                                    min={format(fechaReal, 'yyyy-MM-dd')}
                                    max={format(new Date(fechaReal).setMonth(fechaReal.getMonth() + 3), 'yyyy-MM-dd')}
                                    value={format(fechaElegida, 'yyyy-MM-dd')}
                                    onChange={onFechaChange}
                                    style={{ width: "150px" }}
                                    onKeyDown={(e) => e.preventDefault()}
                                />
                            </div>
                        </div>
                        :
                        <div className="mt-5">
                            <h3 style={{ color: '#7b0101' }}>
                                {`Aún falta más de 1 semana para el estreno, el cual será a partir del ${format(pelicula.fechaInicioEstreno, "dd 'de' MMMM 'de' yyyy", { locale: es })}`}
                            </h3>
                        </div>
                    }
                </div>
            </div>
            {fechaElegida && (
                <MostrarSedesHorarios
                    pelicula={pelicula}
                    fechaFormateada={format(fechaElegida, `yyyy-MM-dd.HH:mm`).replace('.', 'T')}
                />)}
        </div>
    );
};

export default PeliculaSedes;
