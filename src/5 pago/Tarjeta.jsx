import React from 'react';
import './pago.css';

export const Tarjeta = ({ metodo, setMetodo }) => {
  return (
    <button
      onClick={() => setMetodo("tarjeta")}
      className={`payment-method ${
        metodo === "tarjeta" ? "selected tarjeta" : ""
      }`}
    >
      <span>Tarjeta de Crédito o Débito</span>
      <div className="card-images">
        <img src="/visa.png" alt="Visa" className="card-icon" />
        <img src="/mastercard.png" alt="MasterCard" className="card-icon" />
      </div>
    </button>
  );
};