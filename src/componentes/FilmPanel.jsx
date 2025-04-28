import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router';

import FilmTab from "./FilmTab";
import FilmFilter from "./FilmFilter";
import FilmContainer from "./FilmContainer";
import Pelicula from "../servicios/Pelicula"

const useQuery = () => {
    const location = useLocation()
    return [ location, useMemo(() => { return new URLSearchParams(location.search) }, [ location.search ]) ]
}

const FilmPanel = () => {
    const [ peliculas, setPeliculas ] = useState([])
    const [ location, query ] = useQuery()

    useEffect(() => {
        const estado = query ? query.get("tab") : "estreno";
        let caller;

        switch (estado) {
            case "estreno":
                caller = Pelicula.mostrarPeliculasEstreno; break;
            case "proximamente":
                caller = Pelicula.mostrarPeliculasProximas; break;
        }

        if (caller) {
            caller().then(porEstreno => {
                setPeliculas(porEstreno)
            })
        }

    }, [ location ])

    return (<>
        <div className="container-fluid">
            <FilmTab />
            <div className='peli-cuerpo d-flex '>
                <FilmFilter />
                <FilmContainer peliculas={peliculas} />
            </div>
        </div>
    </>)
}

export default FilmPanel;