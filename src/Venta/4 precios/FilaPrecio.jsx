import React from "react";
import { useContext } from "react";
import { VentaContext } from "@/Venta/3 componentesVenta/VentaContextProvider.jsx"
import { env } from "@/configuracion/backend";

const FilaPrecio = ({ nombre, texto, precio, seleccionadas }) => {
    const contexto = useContext(VentaContext);
    const entradasSeleccionadas = contexto.entradasContext.entradasSeleccionadas;

    if (seleccionadas === undefined) {
        seleccionadas = JSON.stringify(contexto.butacaContext.seleccionadas.length);
        
    } else {
        contexto.butacaContext.seleccionadas = seleccionadas;
    }
        env === "dev" && console.log("Seleccionadas", contexto.butacaContext)

    let cantidad, setCantidad

    switch (nombre) {
        case "General":
            cantidad = contexto.entradasContext.generalesSeleccionadas;
            setCantidad = contexto.entradasContext.setGeneralesSeleccionadas;
            break;
        case "Niños":
            cantidad = contexto.entradasContext.niñosSeleccionadas;
            setCantidad = contexto.entradasContext.setNiñosSeleccionadas;
            break;
        case "Conadis":
            cantidad = contexto.entradasContext.conadisSeleccionadas;
            setCantidad = contexto.entradasContext.setConadisSeleccionadas;
            break;
        case "Mayores de 60":
            cantidad = contexto.entradasContext.mayoresSeleccionadas;
            setCantidad = contexto.entradasContext.setMayoresSeleccionadas;
            break;
        default:
            break;
    }
    env === "dev" && console.log("total", contexto.totalContext.total)

    const agregar = () => {
        if (seleccionadas > entradasSeleccionadas) {
            env === "dev" && console.log("entradas seleccionadas", entradasSeleccionadas)
            setCantidad(cantidad + 1);
            contexto.entradasContext.setEntradasSeleccionadas(entradasSeleccionadas + 1)
            env === "dev" && console.log("precio", precio)
            contexto.totalContext.setTotal(contexto.totalContext.total + parseFloat(precio));
        }
    };

    const restar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
            contexto.entradasContext.setEntradasSeleccionadas(entradasSeleccionadas - 1)
            env === "dev" && console.log("precio", precio)
            contexto.totalContext.setTotal(contexto.totalContext.total - parseFloat(precio));
        }
    };
    return (
        <div className="FilaPrecio w-100 d-flex justify-content-between align-items-center">
            <div className="ms-2 ps-1 nombre w-75">
                <span className="m-0 ancizar-sans-regular fs-4 lh-1">{nombre}</span>
                <div className="texto w-100">
                    <span className="ancizar-sans-regular mb-0">{texto}</span>
                    <div className="precio w-100">
                        <span className="m-0 ancizar-sans-regular fs-3">{"S/ " + precio} </span>
                    </div>
                </div>
            </div>

            <div className="d-flex align-middle ">
                <button className="botonQuitar d-flex m-2 border-0 bg-transparent" onClick={restar}  >
                    <div className="botonrestar d-flex">
                        <img src="https://cdn-icons-png.flaticon.com/512/66/66889.png" alt="boton menos" height="30px"></img>
                    </div>
                </button>

                <h3 className="contador align-middle m-2 ancizar-sans-regular mb-0">{cantidad}</h3>

                <button className="botonAgregar d-flex m-2 border-0 bg-transparent" onClick={agregar}>
                    <div className="botonsuma d-flex">
                        <img src="https://cdn-icons-png.flaticon.com/512/117/117885.png" alt="boton mas" height="30px" ></img>
                    </div>
                </button>
            </div>
        </div>
    );
}
export default FilaPrecio;