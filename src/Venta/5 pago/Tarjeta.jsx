import React, { useState, useEffect } from "react";
import "./pago.css";
import PayPalTarjeta from "./PayPalTarjeta";
import axios from "axios";
import { format } from "date-fns";
import MuyPronto from "@/components/Muypronto";
import MercadoPagoTarjeta from "./MercadoPagoTarjeta"
import mercadoPagoIcon from "@/assets/pasarelas/mercado_pago.png"
import paypalIcon from "@/assets/pasarelas/paypal.svg"
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
        className={`payment-method ancizar-sans-regular fs-4 py-2 ${metodo === "soles" ? "selected soles" : ""}`}>
        <span className="">Soles</span>
        <img src={mercadoPagoIcon} alt="mercadoPagoIcon" style={{ height: "25px" }} />
      </button>
      <button onClick={() => setMetodo((prev) => (prev === "dolares" ? "" : "dolares"))}
        className={`payment-method ancizar-sans-regular fs-4 py-2 ${metodo === "dolares" ? "selected dolares" : ""}`}
        disabled={!tipocambio}>
        {tipocambio ? <span className="">Dólares</span> : <span className="fs-5 text-start">Obteniendo tipo de cambio actual...</span>}
        <img src={paypalIcon} alt="paypalIcon" style={{ height: "25px" }} />
      </button>
      {metodo === "soles" && (
        <>
          <MuyPronto></MuyPronto>
          <MercadoPagoTarjeta></MercadoPagoTarjeta>
        </>
      )}
      {metodo === "dolares" && (
        <PayPalTarjeta tarjeta={tarjeta} setTarjeta={setTarjeta} setSubmitting={setSubmitting} setStatus={setStatus}
          setto={setto} tipoCambio={tipocambio} />
      )}
    </>
  );
};
