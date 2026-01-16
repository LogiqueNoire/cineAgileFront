import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { env } from '@/configuracion/backend';

import FilmContainer from "@/venta/1 cartelera/components/FilmContainer";
import PeliculaService from "@/services/PeliculaService"
import FilmTab from '@/venta/1 cartelera/components/film-tab/FilmTab';
import Loading from '@/components/loading/Loading';
import TimeService from '@/services/TimeService';

import '@/globals.css'
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
                const fecha = await TimeService.obtenerFecha()

                const estado = query?.get("tab") || "En cartelera";
                let caller;

                switch (estado) {
                    case "En cartelera":
                        env === "dev" && console.log("Fecha enviada a EnCartelera:", fecha.toISOString());
                        caller = () => PeliculaService.mostrarPeliculasEnCartelera(fecha.toISOString());
                        break;
                    case "Próximamente":
                        env === "dev" && console.log("Fecha enviada a Proximamente:", fecha.toISOString());
                        caller = () => PeliculaService.mostrarPeliculasProximas(fecha.toISOString());
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

    return (
        <div className='film-panel d-flex flex-column'>
            <FilmTab query={query.get("tab")} />
            <div className='peli-cuerpo d-flex justify-content-center flex-grow-1 rounded rounded-4'>
                {loading && <Loading />}
                {!loading && error &&
                        <div className="h-25 w-50 text-center btn-danger btn-danger-gradient p-2 mt-3 rounded rounded-3 fw-bold text-white">Error... Intenta recargar la página</div>}
                {!loading && !error && <FilmContainer peliculas={peliculas} />
                }
            </div>
        </div>
    )
}

export default FilmPanel;