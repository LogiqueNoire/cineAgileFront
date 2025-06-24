import React, { useState } from "react";
import "./pago.css";
import { FormularioTarjeta } from "./FormularioTarjeta";


export const Tarjeta = ({ metodo, setMetodo, tarjeta, setTarjeta, setSubmitting, setStatus, setto }) => {

  return (
    <>
      <button
        onClick={() =>
          setMetodo((prev) => (prev === "tarjeta" ? "" : "tarjeta"))
        }
        className={`payment-method ${
          metodo === "tarjeta" ? "selected tarjeta" : ""
        }`}
      >
        <span className="">Elegir forma de pago</span>
        {/*<div className="card-images">
          <img src="/visa.png" alt="Visa" className="card-icon" />
          <img src="/mastercard.png" alt="MasterCard" className="card-icon" />
        </div>*/}
      </button>

      {metodo === "tarjeta" && (
        <FormularioTarjeta tarjeta={tarjeta} setTarjeta={setTarjeta} setSubmitting={setSubmitting} setStatus={setStatus} setto={setto} />
      )}
    </>
  );
};
