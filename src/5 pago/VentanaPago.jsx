import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { BilleteraElectronica } from "../5 pago/BilleteraElectronica.jsx";
import { Tarjeta } from "../5 pago/Tarjeta.jsx";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx";

export const VentanaPago = () => {
    const location = useLocation();
    const { pelicula, funcion } = location.state || {};
    const contexto = useContext(VentaContext);
    const total = contexto.totalContext.total;

    return (
        <div className="mb-4 container">
            <BilleteraElectronica></BilleteraElectronica>
            <Tarjeta></Tarjeta>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3> {"Total: " + total.toFixed(2)}</h3>
            </div>
        </div>
    );
}