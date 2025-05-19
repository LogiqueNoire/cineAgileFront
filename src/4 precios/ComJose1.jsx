import React from "react";
import { useState, useContext } from "react";
import "./Com.css"
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx"

const ComJose1 = ({ nombre, texto, precio, seleccionadas }) => {
    const [cantidad, setCantidad] = useState(0);
    const butacas = useContext(VentaContext);
    const entradasSeleccionadas = butacas.butacaContext.entradasSeleccionadas;
    
    if (seleccionadas === undefined) {
        seleccionadas = JSON.stringify(butacas.butacaContext.seleccionadas.length);
    } else {
        butacas.butacaContext.seleccionadas = seleccionadas;
    }

    const agregar = () => {
        if (seleccionadas > entradasSeleccionadas) {
            setCantidad(cantidad + 1);
            butacas.butacaContext.setEntradasSeleccionadas(entradasSeleccionadas+1)
        }
    };

    const restar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
            butacas.butacaContext.setEntradasSeleccionadas(entradasSeleccionadas-1)
        }
    };
    return (
        <div className="FilaPrecio w-100 d-flex justify-content-between align-items-center">
            <div className="nombre w-50">
                <h2 className="m-0">{nombre}</h2>
                <div className="texto w-100">
                    <p className="">{texto}</p>
                    <div className="precio w-100">
                        <h5 className="m-0">{precio} </h5>
                    </div>
                </div>
            </div>

            <div className="d-flex align-middle ">
            <button className="botonQuitar d-flex m-2 border-0 bg-transparent" onClick={restar}  >
                <div className="botonrestar d-flex">
                    <img src="https://cdn-icons-png.flaticon.com/512/66/66889.png" alt="boton menos" height="30px"></img>
                </div>
            </button>

            <h3 className="contador align-middle m-2 ">{cantidad}</h3>

            <button className="botonAgregar d-flex m-2 border-0 bg-transparent" onClick={agregar}>
                <div className="botonsuma d-flex">
                    <img src="https://cdn-icons-png.flaticon.com/512/117/117885.png" alt="boton mas" height="30px" ></img>
                </div>
            </button>
            </div>
        </div>
    );
}
export default ComJose1;