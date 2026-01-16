import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Funcion from "@/services/Funcion.js";
import Loading from "@/components/loadingt/Loading.jsx";
import { VentaContext } from "@/venta/VentaContextProvider.jsx";
import FilaPrecio from "./FilaPrecio.jsx";

export const PreciosPage = ({ prev, next, onCancelar }) => {
    const contexto = useContext(VentaContext)
    const location = useLocation();
    const { pelicula, funcion } = location.state || {};
    const [cargandoPrecios, setCargandoPrecios] = React.useState(true);

    const fetchData = async () => {
        try {
            contexto.precios.setPrecioGeneral((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "general"))).toFixed(2));
            contexto.precios.setPrecioNiños((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "niños"))).toFixed(2));
            contexto.precios.setPrecioMayores((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "mayores"))).toFixed(2));
            contexto.precios.setPrecioConadis((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "conadis"))).toFixed(2));
        }
        catch (error) {
            console.error("Error con los precios:", error);
        } finally {
            setCargandoPrecios(false)
        }
    }

    useEffect(() => {

        fetchData();
    }, [funcion.idFuncion]);

    const puedeContinuar = contexto.entradasContext.entradasSeleccionadas === contexto.butacaContext.seleccionadas.length;

    const siguiente = () => {
        if (puedeContinuar)
            next();
    }

    const volver = () => {
        onCancelar(() => {
            contexto.entradasContext.setEntradasSeleccionadas(0)
            contexto.entradasContext.setGeneralesSeleccionadas(0)
            contexto.entradasContext.setNiñosSeleccionadas(0)
            contexto.entradasContext.setConadisSeleccionadas(0)
            contexto.entradasContext.setMayoresSeleccionadas(0)
            contexto.totalContext.setTotal(0)
            prev();
        })
    }

    if (!cargandoPrecios) {

        return (
            <>
                <div className="d-flex my-3 justify-content-center">
                    <div className="ContieneEntradas gap-3 d-flex flex-column justify-content-center align-items-center">
                        <h2 className="ancizar-sans-regular mb-0 cineagile-blue-500">Precios de entradas</h2>
                        <FilaPrecio nombre="General" precio={contexto.precios.precioGeneral} />
                        <FilaPrecio nombre="Mayores de 60" precio={contexto.precios.precioMayores} />
                        {pelicula.clasificacion == "Apto para todos" &&
                            <FilaPrecio nombre="Niños" texto="Para niños de 2 a 11 años. Menores de 2 años no pagan." precio={contexto.precios.precioNiños} />
                        }
                        <FilaPrecio nombre="Conadis" texto="Es obligatorio presentar DNI y carnet Conadis" precio={contexto.precios.precioConadis} />
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-4 align-items-center">
                    <button className="btn btn-primary btn-primary-gradient" onClick={volver} >Volver</button>
                    <button className="btn btn-primary btn-primary-gradient" disabled={!puedeContinuar} onClick={siguiente}>Siguiente</button>
                </div>
            </>

        );
    } else {
        return (
            <div className='d-flex justify-content-center'>
                <Loading style={{ margin: "15rem" }} />
            </div>
        )
    }
}