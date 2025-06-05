import React, { useContext} from "react";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx"

const ResumenPeliComJose3 = ({ pelicula, catePeli, sedePeli, fechaPeli, salaPeli, categoria, butacasSeleccionadas, dimension}) => {
    const contexto = useContext(VentaContext);
    
    if (butacasSeleccionadas === undefined) {
        butacasSeleccionadas = JSON.stringify(contexto.butacaContext.seleccionadas.length);
    } else {
        contexto.butacasContext.seleccionadas = butacasSeleccionadas;
    }
    //${JSON.stringify(butacas.butacaContext.seleccionadas.length)}
    return (
        <div className="Rojo">
            <div className="d-flex justify-content-center">
                <img className="img-fluid imagenPelicula" src={pelicula.imageUrl} alt="imagen"></img>
            </div>

            <div className="d-flex flex-column align-items-center">
                <h1 className="mt-4" style={{ fontSize:'36px', color: 'blue' }}>{pelicula.nombre}</h1>
                <h3 className="m-2">{dimension+" "+categoria}</h3>
                <h5 className="m-2">{"Sede: "+sedePeli}</h5>
                <h5 className="m-2">{"Fecha: "+fechaPeli.slice(0,10)}</h5>
                <h5 className="m-2">{"Hora inicio: "+fechaPeli.slice(11,16)}</h5>
                <h5 className="m-2">{"Sala: " +salaPeli}</h5>
                <h5 className="m-2">{'Butacas: '+butacasSeleccionadas}</h5>
            </div>
        </div>

    );
}
export default ResumenPeliComJose3
