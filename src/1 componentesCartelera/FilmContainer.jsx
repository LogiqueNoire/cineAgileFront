import React from "react";
import FilmCard from "./FilmCard.jsx";

const FilmContainer = ({ peliculas }) => {
    return (
        <div className="d-flex justify-content-center flex-wrap gap-2 col-12">
            {peliculas?.length > 0 ?
                peliculas.map((pelicula) => {
                    return <FilmCard key={pelicula.idPelicula} pelicula={pelicula}></FilmCard>
                })
            :
            <span className="fs-3 px-3">No hay películas para mostrar por ahora.</span>
            }
        </div>
    );
}

export default FilmContainer;