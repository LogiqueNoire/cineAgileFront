import React, { useContext} from "react";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx"

const ComJose3 = ({ idPelicula, nombrePelicula, imagenPeli, catePeli, sedePeli, fechaPeli, salaPeli }) => {
    console.log("imagenPeli", imagenPeli)
    console.log('salaPeli', salaPeli)
    const butacas = useContext(VentaContext);
    return (
        <div className="Rojo bg-light">
            <div className=" d-flex justify-content-center">
                <img className="" src={imagenPeli} alt="imagen" height="200px" ></img>
            </div>
            <h1 className="text-center  m-4" style={{ color: 'blue' }}>{nombrePelicula}</h1>
            <h2 className="text-center  m-3">{catePeli}</h2>
            <h3 className="text-center  m-3">{"Sede: "+sedePeli}</h3>
            <h3 className="text-center  m-3">{"Fecha: "+fechaPeli.slice(0,10)}</h3>
            <h3 className="text-center  m-3">{"Hora inicio: "+fechaPeli.slice(11,16)}</h3>
            <h3 className="text-center  m-3">{"Sala: " +salaPeli}</h3>
            <h3 className="text center m-3">Butacas: {JSON.stringify(butacas.butacaContext.seleccionadas)}</h3>
        </div>

    );
}
export default ComJose3
