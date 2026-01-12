import React, { useState, useEffect } from "react";
import "./pago.css";
import PasarelaPayPal from "./PasarelaPayPal";
import axios from "axios";
import { format } from "date-fns";
import PasarelaMercadoPago from "./PasarelaMetodoPago"
import mercadoPagoIcon from "@/assets/pasarelas/mercado_pago.png"
import paypalIcon from "@/assets/pasarelas/paypal.svg"
import yapeIcon from "@/assets/pasarelas/yape2.png"
import PasarelaYape from "./PasarelaYape";

export const Tarjeta = ({ metodo, setMetodo, setto, registrarEntrada, generarBodyRequest }) => {
  const [tipoCambio, setTipoCambio] = useState();

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
      <h2 className="ancizar-sans-regular fs-5 mb-0">Tarjeta</h2>
      <button onClick={() => setMetodo((prev) => (prev === "soles" ? "" : "soles"))}
        className={`payment-method ancizar-sans-regular fs-4 py-2 ${metodo === "soles" ? "selected soles" : ""}`}>
        <span className="">Soles</span>
        <img src={mercadoPagoIcon} alt="mercadoPagoIcon" style={{ height: "25px" }} />
      </button>
      <button onClick={() => setMetodo((prev) => (prev === "dolares" ? "" : "dolares"))}
        className={`payment-method ancizar-sans-regular fs-4 py-2 ${metodo === "dolares" ? "selected dolares" : ""}`}
        disabled={!tipoCambio}>
        {tipoCambio ? <span className="">Dólares</span> : <span className="fs-5 text-start">Obteniendo tipo de cambio actual...</span>}
        <img src={paypalIcon} alt="paypalIcon" style={{ height: "25px" }} />
      </button>
      <h2 className="ancizar-sans-regular fs-5 mb-0">Billetera digital</h2>
      <button onClick={() => setMetodo((prev) => (prev === "yape" ? "" : "yape"))}
        className={`payment-method ancizar-sans-regular fs-4 py-2 ${metodo === "yape" ? "selected yape" : ""}`}>
        <span className="d-flex flex-column align-items-start">
          <span>Yape</span>
          <span className="fs-6">¡Nueva función!</span>
        </span>
        <img src={yapeIcon} alt="paypalIcon" style={{ height: "55px" }} />
      </button>

      {metodo === "soles" && (<PasarelaMercadoPago generarBodyRequest={generarBodyRequest} />)}
      {metodo === "dolares" && (<PasarelaPayPal setto={setto} tipoCambio={tipoCambio} registrarEntrada={registrarEntrada} />)}
      {metodo === "yape" && (<PasarelaYape generarBodyRequest={generarBodyRequest} />)}
    </>
  );
};
