import React, { useContext} from "react";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx"

import './ComponenteJose.css'

const ComJose3 = ({ pelicula, catePeli, sedePeli, fechaPeli, salaPeli }) => {
    const butacas = useContext(VentaContext);
    return (
        <div className="Rojo">
            <div className="d-flex justify-content-center">
                <img className="img-fluid" src={pelicula.imageUrl} alt="imagen" ></img>
            </div>

            <div className="d-flex flex-column align-items-center">
                <h1 className="display-5 m-4" style={{ color: 'blue' }}>{pelicula.nombre}</h1>
                <h3 className="m-2">{catePeli}</h3>
                <h5 className="m-2">{"Sede: "+sedePeli}</h5>
                <h5 className="m-2">{"Fecha: "+fechaPeli.slice(0,10)}</h5>
                <h5 className="m-2">{"Hora inicio: "+fechaPeli.slice(11,16)}</h5>
                <h5 className="m-2">{"Sala: " +salaPeli}</h5>
                <h5 className="m-2">{ `Butacas: ${JSON.stringify(butacas.butacaContext.seleccionadas.length)} `}</h5>
            </div>
        </div>

    );
}
export default ComJose3
