import React from "react";
import FilmCard from "./FilmCard";

//los estdos son: "En cartelera", "Próximamente", "Preventa", "No visible"
const FilmTab = ({ estado, peliculas }) => {
    return (
        <div className="tab-pane" id={estado} role="tabpanel" aria-labelledby={estado + "-tab"} tabIndex="0">
            <div className="d-flex flex-wrap justify-content-center">
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