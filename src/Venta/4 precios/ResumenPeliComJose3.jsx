import React, { useContext} from "react";
import { VentaContext } from "@/Venta/3 componentesVenta/VentaContextProvider.jsx"
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
        <div className="Rojo d-flex flex-column flex-sm-row flex-lg-column justify-content-center gap-3 px-4 pt-4">
            <div className="d-flex justify-content-center col-12 col-sm-6 col-lg-12">
                <img className="card img-fluid img-film-card2 shadow rounded" style={{ height: "350px", aspectRatio: "3/5" }} src={pelicula.imageUrl} alt={pelicula.nombre}></img>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center col-12 col-sm-6 col-lg-12">
                <h2 className="mb-0 ancizar-sans-regular display-4 film-title text-center cineagile-blue-500 fs-1">{pelicula.nombre}</h2>
                <h3 className="m-2 ancizar-sans-regular">{dimension+" "+categoria}</h3>
                <h5 className="m-2 ancizar-sans-regular text-center">{"Sede: "+sedePeli}</h5>
                <h5 className="m-2 ancizar-sans-regular">{"Fecha: "+format(parseISO(fechaPeli.slice(0, 10)), "dd/MM/yyyy")}</h5>
                <h5 className="m-2 ancizar-sans-regular">{"Hora inicio: "+fechaPeli.slice(11,16)}</h5>
                <h5 className="m-2 ancizar-sans-regular">{"Sala: " +salaPeli}</h5>
                <h5 className="m-2 ancizar-sans-regular">{'Butacas: '+butacasSeleccionadas}</h5>
            </div>
        </div>

    );
}
export default ResumenPeliComJose3
