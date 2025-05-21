import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { BilleteraElectronica } from "./BilleteraElectronica.jsx";
import { Tarjeta } from "./Tarjeta.jsx";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx";
import { TerminosCondiciones } from "./TerminosCondiciones.jsx";
import { ModalTerminos } from "./ModalTerminos.jsx";

export const VentanaPago = () => {
  const location = useLocation();
  const { pelicula, funcion } = location.state || {};
  const contexto = useContext(VentaContext);
  const total = contexto.totalContext.total;

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [metodo, setMetodo] = useState("");
  const [tarjeta, setTarjeta] = useState({
    numero: "",
    tipo: "",
    mes: "",
    anio: "",
    cvv: "",
  });

  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="mb-4 container">
      <h3 className="titulo-pago">Elige una forma de Pago</h3>

      <div className="formulario-contacto">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <Tarjeta
        metodo={metodo}
        setMetodo={setMetodo}
        tarjeta={tarjeta}
        setTarjeta={setTarjeta}
      />

      <BilleteraElectronica metodo={metodo} setMetodo={setMetodo} />

      <TerminosCondiciones
        aceptaTerminos={aceptaTerminos}
        setAceptaTerminos={setAceptaTerminos}
        onVerDetalles={() => setModalAbierto(true)}
      />

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3>{"Total: S/ " + total.toFixed(2)}</h3>
      </div>

      {modalAbierto && <ModalTerminos onClose={() => setModalAbierto(false)} />}
    </div>
  );
};
