import React from "react";
import FilmCard from "./FilmCard.jsx";

//los estdos son: "En cartelera", "Próximamente", "Preventa", "No visible"
const FilmTab = ({ estado, peliculas }) => {
    return (
        <div className="" id={estado}>
            <div className="d-flex justify-content-center flex-wrap">
                {peliculas.map((pelicula) => {
                    if (pelicula.estado === estado) {
                        return <FilmCard key={1&pelicula.id} pelicula={pelicula}></FilmCard>
                    }
                })}
            </div>
        </div>
    );
}

export default FilmTab;