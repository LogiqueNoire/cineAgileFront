import React from "react";
import "./pago.css";

export const TerminosCondiciones = ({
  aceptaTerminos,
  setAceptaTerminos,
  onVerDetalles,
  setto
}) => {
  return (
    <div className="terms">
      <span className="switch m-2">
        <input
          type="checkbox"
          id="terminos"
          checked={aceptaTerminos}
          onChange={(e) => setAceptaTerminos(e.target.checked)}
          disabled={!setto.terminos} />
        <span className="slider round"></span>
      </span>
      <label htmlFor="terminos" className="ancizar-sans-regular fs-5">
        Acepto los{" "}
        <a
          href="#"
          className="link"
          onClick={(e) => {
            e.preventDefault();
            onVerDetalles();
          }}
        >
          términos y condiciones
        </a>
      </label>
    </div>
  );
};
