import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

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
        const estado = query ? (query.get("tab") ? query.get("tab") : "estreno" ) : "estreno";
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
            <div className='peli-cuerpo d-flex '>
                <FilmContainer peliculas={peliculas} />
            </div>
        </div>
    </>)
}

export default FilmPanel;