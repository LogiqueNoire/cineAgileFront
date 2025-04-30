import React from 'react';
import './pago.css';

export const BilleteraElectronica = ({ metodo, setMetodo }) => {
  return (
    <button
      onClick={() => setMetodo("billetera")}
      className={`payment-method ${
        metodo === "billetera" ? "selected billetera" : ""
      }`}
    >
      <span>Billeteras Electrónicas</span>
      <div className="wallet-images">
        <img src="/yape.png" alt="Yape" className="wallet-icon" />
        <img src="/plin.png" alt="Plin" className="wallet-icon" />
      </div>
    </button>
  );
};