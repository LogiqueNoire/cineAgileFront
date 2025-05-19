import React, { useEffect } from "react";
import ComJose1 from "./ComJose1";
import ComJose3 from "./ComJose3";
import { useLocation } from "react-router-dom";
import Funcion from "../servicios/Funcion.js";

export const VentanaPrecios = () => {
    const location = useLocation();
    const { pelicula, funcion } = location.state || {};
    const [precioGeneral, setPrecioGeneral] = React.useState();
    const [precioNiños, setPrecioNiños] = React.useState();
    const [precioMayores, setPrecioMayores] = React.useState();
    const [precioConadis, setPrecioConadis] = React.useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPrecioGeneral((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "general"))).toFixed(2));
                setPrecioNiños((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "niños"))).toFixed(2));
                setPrecioMayores((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "mayores"))).toFixed(2));
                setPrecioConadis((parseFloat(await Funcion.mostrarPreciosdeFuncion(funcion.idFuncion, "conadis"))).toFixed(2));
            }
            catch (error) {
                console.error("Error con los precios:", error);
            }
        }
        fetchData();
    }, [funcion.idFuncion]);

    return(
        <div className="d-flex mb-4">
            <div className="ContieneEntradas gap-3 d-flex flex-column justify-content-center align-items-center">
                <h3> PRECIOS DE LAS ENTRADAS </h3>
                <ComJose1 nombre="General" precio ={(precioGeneral===undefined ? "Cargando" : "S/ "+precioGeneral)} ></ComJose1>
                <ComJose1 nombre="Mayores de 60" precio ={(precioMayores===undefined ? "Cargando" : "S/ "+precioMayores)} ></ComJose1>
                <ComJose1 nombre="Niños" texto="Para niños de 2 a 11 años. Menores de 2 años no pagan." precio ={(precioNiños===undefined ? "Cargando" : "S/ "+precioNiños)} ></ComJose1>
                <ComJose1 nombre="Conadis" texto="Es obligatorio presentar DNI y carnet Conadis" precio ={(precioConadis===undefined ? "Cargando" : "S/ "+precioConadis)} ></ComJose1>
            </div>
        </div>
);
}