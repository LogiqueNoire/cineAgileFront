import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BilleteraElectronica } from "./BilleteraElectronica.jsx";
import { Tarjeta } from "./Tarjeta.jsx";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx";
import { TerminosCondiciones } from "./TerminosCondiciones.jsx";
import { ModalTerminos } from "./ModalTerminos.jsx";
import Entrada from "../servicios/Entrada.js";
import { format } from "date-fns";

export const VentanaPago = ({ prev, next }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pelicula, funcion } = location.state || {};
  const contexto = useContext(VentaContext);
  const total = Number(contexto.totalContext.total.toFixed(2));

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

  const volver = () => {
    prev();
  }

//////////////////////ver
    // Temporal
  let bloquearSolicitud = false;

  const registrarTest = () => {
    if (!bloquearSolicitud) {
      bloquearSolicitud = true;

      let tiposEntradas = [];
      const entradasContext = contexto.entradasContext;

      tiposEntradas = tiposEntradas.concat(new Array(entradasContext.generalesSeleccionadas).fill("general"));
      tiposEntradas = tiposEntradas.concat(new Array(entradasContext.niñosSeleccionadas).fill("niños"));
      tiposEntradas = tiposEntradas.concat(new Array(entradasContext.conadisSeleccionadas).fill("conadis"));
      tiposEntradas = tiposEntradas.concat(new Array(entradasContext.mayoresSeleccionadas).fill("mayores"));

      const entradas = contexto.butacaContext.seleccionadas.map(el => ({
         id_butaca: el.id, 
         persona: tiposEntradas.shift()
      }));
  
      const fechaAhora = (new Date(Date.now()));

      const cuerpo = {
        id_funcion: contexto.general.funcion.idFuncion,
        entradas: entradas,
        tiempoRegistro: format(fechaAhora, "yyyy-MM-dd.HH:mm:ss").replace(".", "T")// .toISOString()
      }

      console.log(cuerpo);

      Entrada.comprarEntrada(cuerpo).then(res => {
        console.log(res);
        navigate("/entradas", { state: { entradas: res.data.entradasCompradasDTO } })
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center gap-4">
        <h2 className="">Módulo de pago</h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3>{"Total: S/ " + total.toFixed(2)}</h3>
        </div>
        <TerminosCondiciones
          aceptaTerminos={aceptaTerminos}
          setAceptaTerminos={setAceptaTerminos}
          onVerDetalles={() => setModalAbierto(true)}
        />

        {aceptaTerminos &&
          <div className="formulario-contacto">
            <Tarjeta
              metodo={metodo}
              setMetodo={setMetodo}
              tarjeta={tarjeta}
              setTarjeta={setTarjeta}
            />
          </div>
        }

        {/*
          <BilleteraElectronica metodo={metodo} setMetodo={setMetodo} />
        */}        

        {modalAbierto && <ModalTerminos onClose={() => setModalAbierto(false)} />}
      </div>

      <div className="d-flex justify-content-center gap-4 align-items-center">
        <button className="btn btn-warning" onClick={registrarTest}>Pasar!</button>
        <button className="btn btn-primary" onClick={volver} >Volver</button>
        {/*<button className="btn btn-warning" onClick={registrarTest}>Registrar (Test)</button>*/}
      </div>


    </>

  );
};
