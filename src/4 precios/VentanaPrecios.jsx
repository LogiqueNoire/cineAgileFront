import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Funcion from "../servicios/Funcion.js";
import Loading from "../0 componentesGenerales/Loading.jsx";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx";
import FilaPrecio from "./FilaPrecio.jsx";

export const VentanaPrecios = ({ prev, next, onCancelar }) => {
    const contexto = useContext(VentaContext)
    const location = useLocation();
    const { pelicula, funcion } = location.state || {};
    const [precioGeneral, setPrecioGeneral] = React.useState();
    const [precioNiños, setPrecioNiños] = React.useState();
    const [precioMayores, setPrecioMayores] = React.useState();
    const [precioConadis, setPrecioConadis] = React.useState();
    const [cargandoPrecios, setCargandoPrecios] = React.useState(true);

    const fetchData = async () => {
        try {
            setPrecioGeneral((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "general"))).toFixed(2));
            setPrecioNiños((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "niños"))).toFixed(2));
            setPrecioMayores((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "mayores"))).toFixed(2));
            setPrecioConadis((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "conadis"))).toFixed(2));
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
                <div className="d-flex mb-4 justify-content-center">
                    <div className="ContieneEntradas gap-3 d-flex flex-column justify-content-center align-items-center">
                        <h3> PRECIOS DE LAS ENTRADAS </h3>
                        <FilaPrecio nombre="General" precio={precioGeneral} />
                        <FilaPrecio nombre="Mayores de 60" precio={precioMayores} />
                        {pelicula.clasificacion == "Apto para todos" &&
                            <FilaPrecio nombre="Niños" texto="Para niños de 2 a 11 años. Menores de 2 años no pagan." precio={precioNiños} />
                        }
                        <FilaPrecio nombre="Conadis" texto="Es obligatorio presentar DNI y carnet Conadis" precio={precioConadis} />
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-4 align-items-center">
                    <button className="btn btn-primary" onClick={volver} >Volver</button>
                    <button className="btn btn-primary" disabled={!puedeContinuar} onClick={siguiente}>Siguiente</button>
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