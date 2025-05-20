import React, { useEffect } from "react";
import FilaPrecioComJose1 from "./FilaPrecioComJose1.jsx";
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
                <FilaPrecioComJose1 nombre="General" precio ={(precioGeneral===undefined ? "Cargando" : precioGeneral)} />
                <FilaPrecioComJose1 nombre="Mayores de 60" precio ={(precioMayores===undefined ? "Cargando" : precioMayores)} />
                <FilaPrecioComJose1 nombre="Niños" texto="Para niños de 2 a 11 años. Menores de 2 años no pagan." precio ={(precioNiños===undefined ? "Cargando" : precioNiños)} />
                <FilaPrecioComJose1 nombre="Conadis" texto="Es obligatorio presentar DNI y carnet Conadis" precio ={(precioConadis===undefined ? "Cargando" : precioConadis)} />
            </div>
        </div>
);
}