import React from "react";

//los estdos son: "En cartelera", "Próximamente", "Preventa", "No visible"
const FilmTab = ({ estado, peliculas }) => {
    return (
        <div className="tab-pane fade" id={estado} role="tabpanel" aria-labelledby={estado + "-tab"} tabIndex="0">
            <div className="d-flex flex-wrap justify-content-center">
                {peliculas.map((pelicula) => {
                    return (
                        <div className="card m-2" key={pelicula.id}>
                            <img src={pelicula.poster} className="card-img-top" alt={pelicula.titulo} />
                            <div className="card-body">
                                <h5 className="card-title">{pelicula.titulo}</h5>
                                <p className="card-text">{pelicula.descripcion}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FilmTab;