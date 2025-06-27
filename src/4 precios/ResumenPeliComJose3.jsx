import React, { useContext} from "react";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx"
import { format, parseISO } from "date-fns";

const ResumenPeliComJose3 = ({ pelicula, catePeli, sedePeli, fechaPeli, salaPeli, categoria, butacasSeleccionadas, dimension, idFuncion}) => {
    const contexto = useContext(VentaContext);
    
    if (butacasSeleccionadas === undefined) {
        butacasSeleccionadas = JSON.stringify(contexto.butacaContext.seleccionadas.length);
    } else {
        contexto.butacasContext.seleccionadas = butacasSeleccionadas;
    }
    //${JSON.stringify(butacas.butacaContext.seleccionadas.length)}
    return (
        <div className="Rojo d-flex flex-column flex-sm-row flex-lg-column justify-content-center">
            <div className="d-flex justify-content-center col-12 col-sm-6 col-lg-12">
                <img className="card img-fluid img-film-card2 shadow rounded" style={{ height: "350px", aspectRatio: "3/5" }} src={pelicula.imageUrl} alt={pelicula.nombre}></img>
            </div>

            <div className="d-flex flex-column align-items-center col-12 col-sm-6 col-lg-12">
                <h1 className="mt-4" style={{ fontSize:'36px', color: 'blue' }}>{pelicula.nombre}</h1>
                <h3 className="m-2">{dimension+" "+categoria}</h3>
                <h5 className="m-2">{"Sede: "+sedePeli}</h5>
                <h5 className="m-2">{"Fecha: "+format(parseISO(fechaPeli.slice(0, 10)), "dd/MM/yyyy")}</h5>
                <h5 className="m-2">{"Hora inicio: "+fechaPeli.slice(11,16)}</h5>
                <h5 className="m-2">{"Sala: " +salaPeli}</h5>
                <h5 className="m-2">{'Butacas: '+butacasSeleccionadas}</h5>
            </div>
        </div>

    );
}
export default ResumenPeliComJose3
