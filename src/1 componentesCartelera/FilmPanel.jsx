import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FilmContainer from "./FilmContainer";
import Pelicula from "../servicios/Pelicula"
import FilmTab from './FilmTab';
import Loading from '../0 componentesGenerales/Loading';

import "./FilmPanel.css"

const useUrlQuery = () => {
    const location = useLocation()
    return [ location, useMemo(() => { return new URLSearchParams(location.search) }, [ location.search ]) ]
}

const FilmPanel = () => {
    const [ peliculas, setPeliculas ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    const [ location, query ] = useUrlQuery()

    useEffect(() => {
        const estado = query ? (query.get("tab") ? query.get("tab") : "En cartelera" ) : "Próximamente";
        let caller;

        switch (estado) {
            case "En cartelera":
                caller = Pelicula.mostrarPeliculasEnCartelera; break;
            case "Próximamente":
                caller = Pelicula.mostrarPeliculasProximas; break;
        }

        if (caller) {
            caller().then(pelis => {
                setPeliculas(pelis.reverse())
            }).catch(err => {
                setError("Error :(... Intenta recargar la página!")
            }).finally(() => {
                setLoading(false)
            })
        }

        return () => {
            setLoading(true)
            setError(null)
        }
    }, [ location ])

    return (<div className='film-panel d-flex flex-column'>
            <FilmTab query={ query.get("tab") } />
            <div className='peli-cuerpo d-flex justify-content-center flex-grow-1'>
                { loading && <Loading /> }
                { error && <div className="alert alert-danger h-25 w-50 text-center">Error :/... Intenta recargar la página</div> }
                { !loading && <FilmContainer peliculas={peliculas} /> }
            </div>
    </div>)
}

export default FilmPanel;