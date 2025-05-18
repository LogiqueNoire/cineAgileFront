import React from "react";
import ComJose1 from "./ComJose1";
import ComJose3 from "./ComJose3";
import { useLocation } from "react-router-dom";

export const VentanaPrecios = () => {
    const location = useLocation();
    const { pelicula, funcion } = location.state || {};

    console.log("Ventana precios",pelicula)

    //const navigate = useNavigate();
    
    //const handleClick = () => {
        // Cambiar la ruta
        //navigate(`/funcion/pelicula/`, { state: { consultaIdPelicula: pelicula.idPelicula, nombrePelicula: pelicula.nombre, imagenPeli: pelicula.imageUrl } });
    //};

    return(
        <div className="d-flex mb-4">
            <div className="ContieneEntradas gap-3 d-flex flex-column justify-content-center align-items-center">
                <h3> ENTRADAS GENERALES </h3>
                <ComJose1 nombre="GENERAL 2D" precio ="S/27.00" ></ComJose1>
                <ComJose1 nombre="Mayores 60 2D" precio ="S/25.00" ></ComJose1>
                <ComJose1 nombre="Niños 2D" texto="Para niños de 2 a 11 años" precio ="S/18.00" ></ComJose1>
                <ComJose1 nombre="Conadis 2D" texto="Es obligatorio presentar DNI y carnet Conadis" precio ="S/18.00" ></ComJose1>
            </div>
        </div>
);
}