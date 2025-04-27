import React from "react";
import FilmCard from "./FilmCard";

//los estdos son: "En cartelera", "Próximamente", "Preventa", "No visible"
const FilmTab = ({ estado, peliculas }) => {
    return (
        <div className="" id={estado}>
            <div className="d-flex justify-content-center">
                {peliculas.map((pelicula) => {
                    if (pelicula.estado === estado) {
                        return <FilmCard key={pelicula.id} pelicula={pelicula}></FilmCard>
                    }
                })}
            </div>
        </div>
    );
}

export default FilmTab;