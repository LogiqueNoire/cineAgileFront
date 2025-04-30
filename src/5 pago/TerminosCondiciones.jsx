import React from 'react';
import './pago.css';

export const TerminosCondiciones = ({ aceptaTerminos, setAceptaTerminos, onVerDetalles }) => {
  return (
    <div className="terms">
      <input
        type="checkbox"
        id="terminos"
        checked={aceptaTerminos}
        onChange={(e) => setAceptaTerminos(e.target.checked)}
      />
      <label htmlFor="terminos">
        Acepto los{" "}
        <a
          href="#"
          className="link"
          onClick={(e) => {
            e.preventDefault();
            onVerDetalles();
          }}
        >
          Términos y Condiciones
        </a>
      </label>
    </div>
  );
};