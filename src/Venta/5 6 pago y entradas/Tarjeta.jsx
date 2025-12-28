import React, { useState, useEffect } from "react";
import "./pago.css";
import { FormularioTarjeta } from "./FormularioTarjeta";
import axios from "axios";
import { format } from "date-fns";
import MuyPronto from "@/components/Muypronto";

export const Tarjeta = ({ metodo, setMetodo, tarjeta, setTarjeta, setSubmitting, setStatus, setto }) => {
  const [tipocambio, setTipoCambio] = useState();

  const obtenerTipoCambio = async (fecha) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/venta/v1/tipo-cambio?date=${format(fecha, "yyyy-MM-dd")}`, { timeout: 5000 });
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
      <button onClick={() => setMetodo((prev) => (prev === "soles" ? "" : "soles"))}
        className={`payment-method ancizar-sans-regular ${metodo === "soles" ? "selected soles" : ""}`}>
          <span className="">Soles</span>
      </button>
      <button onClick={() => setMetodo((prev) => (prev === "dolares" ? "" : "dolares"))}
        className={`payment-method ancizar-sans-regular ${metodo === "dolares" ? "selected dolares" : ""}`}
        disabled={!tipocambio}>
        {tipocambio ? <span className="">Dólares</span> : <span className="">Obteniendo tipo de cambio actual...</span>}
        {/*<div className="card-images">
          <img src="/visa.png" alt="Visa" className="card-icon" />
          <img src="/mastercard.png" alt="MasterCard" className="card-icon" />
        </div>*/}
      </button>
      {metodo === "soles" && (
        <MuyPronto></MuyPronto>
      )}
      {metodo === "dolares" && (
        <FormularioTarjeta tarjeta={tarjeta} setTarjeta={setTarjeta} setSubmitting={setSubmitting} setStatus={setStatus}
          setto={setto} tipoCambio={tipocambio} />
      )}
    </>
  );
};
