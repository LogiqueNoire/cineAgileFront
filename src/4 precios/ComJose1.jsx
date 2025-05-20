import React from "react";
import { useState, useContext } from "react";
import "./Com.css"
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx"

const ComJose1 = ({ nombre, texto, precio, seleccionadas }) => {
    const [cantidad, setCantidad] = useState(0);
    const contexto = useContext(VentaContext);
    const entradasSeleccionadas = contexto.entradasContext.entradasSeleccionadas;
    const total = contexto.totalContext.total;
    
    if (seleccionadas === undefined) {
        seleccionadas = JSON.stringify(contexto.butacaContext.seleccionadas.length);
    } else {
        contexto.butacaContext.seleccionadas = seleccionadas;
    }

    const agregar = () => {
        if (seleccionadas > entradasSeleccionadas) {
            console.log("entradas seleccionadas", entradasSeleccionadas)
            setCantidad(cantidad + 1);
            contexto.entradasContext.setEntradasSeleccionadas(entradasSeleccionadas+1)
            console.log("precio", precio)
            contexto.totalContext.setTotal(total + parseFloat(precio));
            
            if (nombre === "General") {
                contexto.entradasContext.setGeneralesSeleccionadas(contexto.entradasContext.generalesSeleccionadas + 1);
            }
            if (nombre === "Niños") {
                contexto.entradasContext.setNiñosSeleccionadas(contexto.entradasContext.niñosSeleccionadas + 1);
            }
            if (nombre === "Conadis") {
                contexto.entradasContext.setConadisSeleccionadas(contexto.entradasContext.conadisSeleccionadas + 1);
            }
            if (nombre === "Mayores de 60") {
                contexto.entradasContext.setMayoresSeleccionadas(contexto.entradasContext.mayoresSeleccionadas + 1);
            }
        }
    };

    const restar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
            contexto.entradasContext.setEntradasSeleccionadas(entradasSeleccionadas-1)
            console.log("precio", precio)
            contexto.totalContext.setTotal(total - parseFloat(precio));
            if (nombre === "General") {
                contexto.entradasContext.setGeneralesSeleccionadas(contexto.entradasContext.generalesSeleccionadas - 1);
            }
            if (nombre === "Niño") {
                contexto.entradasContext.setNiñosSeleccionadas(contexto.entradasContext.niñosSeleccionadas - 1);
            }
            if (nombre === "Conadis") {
                contexto.entradasContext.setConadisSeleccionadas(contexto.entradasContext.conadisSeleccionadas - 1);
            }
            if (nombre === "Mayores de 60") {
                contexto.entradasContext.setMayoresSeleccionadas(contexto.entradasContext.mayoresSeleccionadas - 1);
            }
        }
    };
    return (
        <div className="FilaPrecio w-100 d-flex justify-content-between align-items-center">
            <div className="nombre w-50">
                <h2 className="m-0">{nombre}</h2>
                <div className="texto w-100">
                    <p className="">{texto}</p>
                    <div className="precio w-100">
                        <h5 className="m-0">{"S/ "+precio} </h5>
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