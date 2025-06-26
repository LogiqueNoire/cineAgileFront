import React from "react";
import FilmCard from "./FilmCard.jsx";

const FilmContainer = ({ peliculas }) => {
    return (
            <div className="d-flex justify-content-center flex-wrap gap-2">
                {peliculas.map((pelicula) => {
                    return <FilmCard key={pelicula.idPelicula} pelicula={pelicula}></FilmCard>
                })}
            </div>
    );
}

export default FilmContainer;