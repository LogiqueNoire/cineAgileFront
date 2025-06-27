import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FilmContainer from "./FilmContainer";
import Pelicula from "../servicios/Pelicula"
import FilmTab from './FilmTab';
import Loading from '../0 componentesGenerales/Loading';
import axios from 'axios';
import { url } from '../configuracion/backend';

import "./FilmPanel.css"

const useUrlQuery = () => {
    const location = useLocation()
    return [location, useMemo(() => { return new URLSearchParams(location.search) }, [location.search])]
}

const FilmPanel = () => {
    const [peliculas, setPeliculas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [location, query] = useUrlQuery()

    useEffect(() => {
    const obtenerPeliculas = async () => {
        try {
            const respuesta = await axios.get(`${url}/fecha-actual`);
            const fecha = new Date(respuesta.data);

            const estado = query?.get("tab") || "En cartelera";
            let caller;

            switch (estado) {
                case "En cartelera":
                    console.log("Fecha enviada a EnCartelera:", fecha.toISOString());
                    caller = () => Pelicula.mostrarPeliculasEnCartelera(fecha.toISOString());
                    break;
                case "Próximamente":
                    console.log("Fecha enviada a Proximamente:", fecha.toISOString());
                    caller = () => Pelicula.mostrarPeliculasProximas(fecha.toISOString());
                    break;
                default:
                    caller = null;
            }

            if (caller) {
                const pelis = await caller();
                setPeliculas(pelis.reverse());
            }
        } catch (err) {
            console.error("Error al obtener las películas:", err);
            setError("Error :(... Intenta recargar la página!");
        } finally {
            setLoading(false);
        }
    };

    obtenerPeliculas();

    return () => {
        setLoading(true);
        setError(null);
    };
}, [location]);



    return (<div className='film-panel d-flex flex-column'>
        <FilmTab query={query.get("tab")} />
        <div className='peli-cuerpo d-flex justify-content-center flex-grow-1 rounded rounded-4'>
            {loading 
                ? <Loading />
                : error
                    ? <div className="alert alert-danger h-25 w-50 text-center">Error :/... Intenta recargar la página</div>
                    : <FilmContainer peliculas={peliculas} />
            }
        </div>
    </div>)
}

export default FilmPanel;