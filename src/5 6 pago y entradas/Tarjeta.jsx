import React, { useState, useEffect } from "react";
import "./pago.css";
import { FormularioTarjeta } from "./FormularioTarjeta";
import axios from "axios";
import { format } from "date-fns";

export const Tarjeta = ({ metodo, setMetodo, tarjeta, setTarjeta, setSubmitting, setStatus, setto }) => {
  const [tipocambio, setTipoCambio] = useState();

  const obtenerTipoCambio = async (fecha) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/tipo-cambio?date=${format(fecha, "yyyy-MM-dd")}`, { timeout: 5000 });
      console.log("Tipo de cambio:", response.data);
      setTipoCambio(response.data.precioVenta)
    } catch (error) {
      setTipoCambio(3.6)
      console.error("Error al obtener tipo de cambio:", error);
    }
  };

  useEffect(() => {
    obtenerTipoCambio(new Date(Date.now()))
  }, [])

  return (
    <>
      <button
        onClick={() =>
          setMetodo((prev) => (prev === "tarjeta" ? "" : "tarjeta"))
        }
        className={`payment-method ${metodo === "tarjeta" ? "selected tarjeta" : ""
          }`}
          disabled={!tipocambio}
      >
        {!tipocambio ? <span className="">Obteniendo tipo de cambio actual...</span> : <span className="">Elegir forma de pago</span>}
        {/*<div className="card-images">
          <img src="/visa.png" alt="Visa" className="card-icon" />
          <img src="/mastercard.png" alt="MasterCard" className="card-icon" />
        </div>*/}
      </button>

      {metodo === "tarjeta" && (
        <FormularioTarjeta tarjeta={tarjeta} setTarjeta={setTarjeta} setSubmitting={setSubmitting} setStatus={setStatus}
         setto={setto} tipoCambio={tipocambio}/>
      )}
    </>
  );
};
