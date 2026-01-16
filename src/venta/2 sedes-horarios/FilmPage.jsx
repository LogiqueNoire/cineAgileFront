import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SedesHorariosContainer from "./SedesHorariosContainer";
import { format, differenceInCalendarDays } from 'date-fns';
import PeliculaService from "@/services/PeliculaService";
import Loading from "@/components/loadingt/Loading";
import axios from "axios";
import { backend_url } from "@/configuracion/backend"
import { es } from 'date-fns/locale';

import '@/venta/1 cartelera/components/film-card/filmCard.css';
import TimeService from "@/services/TimeService";

const FilmPage = () => {
    const location = useLocation();
    const { consultaIdPelicula } = location.state || {};

    const [fechaReal, setFechaReal] = useState(null);
    const [fechaElegida, setFechaElegida] = useState(null);
    const [pelicula, setPelicula] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generosDePelicula = async () => {
            try {
                let response = await axios.get(`${backend_url}/api/venta/v1/generos?pelicula=${consultaIdPelicula}`);
                setPelicula(prev => ({ ...prev, genero: response.data }));
            } catch (err) {
                console.error("Error al obtener la fecha:", err);
            }
        };

        if (!consultaIdPelicula) return;

        PeliculaService.mostrarPelicula(consultaIdPelicula)
            .then(data => { setPelicula(data); generosDePelicula() })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [consultaIdPelicula]);

    useEffect(() => {
        (async () => {
            const data = await TimeService.obtenerFecha();
            setFechaReal(data);
        })();
    }, []);

    useEffect(() => {
        setFechaElegida(fechaReal)
        //console.log("respuesta fecha", fechaReal)
        //console.log("format fecha", format(new Date(fechaReal), `yyyy-MM-dd`))
    }, [fechaReal])


    const onFechaChange = (e) => {
        setFechaElegida(new Date(`${e.target.value}T00:00`));
    };

    if (loading || !fechaReal) {
        return <div className="d-flex justify-content-center"><Loading /></div>;
    }

    if (error) {
        return <h1 className="mb-0">Error cargando datos</h1>;
    }

    return (
        <div className="px-4">
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-center flex-wrap flex-sm-wrap flex-md-nowrap align-items-end
                col-12 col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-8
                bg-body-secondary bg-opacity-50 gap-4 px-4 py-4 my-4 mt-5 rounded rounded-5">
                    <img className="card col-12 col-xs-12 col-sm-6 col-md-5 col-lg-3 shadow rounded rounded-4 img-film-card2 justify-content-center"
                        style={{ minHeight: "350px", aspectRatio: "3/5" }} src={pelicula.imageUrl} alt={pelicula.nombre} />
                    <div className="col-12 col-sm-12 col-md-6 col-lg-8 info-pelicula">
                        <div className="d-flex flex-column gap-2">
                            <h1 className="display-4 film-title cineagile-blue-500 ancizar-sans-regular mb-0">{pelicula.nombre}</h1>
                            <h5 className="cineagile-blue-600 ancizar-sans-regular mb-0">{`${pelicula.clasificacion}${pelicula.genero != undefined && pelicula.genero.length != 0 ? " | " + pelicula.genero.map(g => g.nombre).join(', ') : ""}`}</h5>
                            <div>
                                <p className="fs-4 ancizar-sans-regular mb-0">{`Sinopsis`}</p>
                                <p className="ancizar-sans-regular mb-0">{pelicula.sinopsis}</p>
                            </div>
                            {pelicula.director != " " && <h5 className="ancizar-sans-regular mb-0">{`Director. ${pelicula.director}`}</h5>}
                            {pelicula.actores != " " && <h5 className="ancizar-sans-regular mb-0">{`Actores principales. ${pelicula.actores}`}</h5>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-center flex-column
            col-12 col-xs-12 col-sm-12 col-md-10 col-lg-10">
                    {differenceInCalendarDays(pelicula.fechaInicioEstreno, fechaReal) < 8 ?
                        <div className='mt-3'>
                            <div className="d-flex justify-content-center flex-row gap-3 align-items-center">
                                <h2 className="me-2 fw-bold fs-1 ancizar-sans-regular mb-0 text-center fs-sm-2">Tu fecha ideal</h2>
                                <input
                                    type="date"
                                    className="mx-1 form-control"
                                    min={format(fechaReal, 'yyyy-MM-dd')}
                                    max={format(new Date(fechaReal).setMonth(fechaReal.getMonth() + 3), 'yyyy-MM-dd')}
                                    value={format(fechaElegida, 'yyyy-MM-dd')}
                                    onChange={onFechaChange}
                                    style={{ width: "150px", height: "min-content" }}
                                    onKeyDown={(e) => e.preventDefault()}
                                />
                            </div>
                        </div>
                        :
                        <div className="mt-3">
                            <h3 className="px-4 text-center ancizar-sans-regular mb-0" style={{ color: 'var(--red-danger-500)' }}>
                                {`Aún falta más de 1 semana para el estreno, el cual será a partir del ${format(pelicula.fechaInicioEstreno, "dd 'de' MMMM 'de' yyyy", { locale: es })}`}
                            </h3>
                        </div>
                    }
                    {fechaElegida && (
                        <SedesHorariosContainer
                            pelicula={pelicula}
                            fechaFormateada={format(fechaElegida, `yyyy-MM-dd.HH:mm`).replace('.', 'T')}
                        />)}
                </div>
            </div>
        </div>
    );
};

export default FilmPage;
