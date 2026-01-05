import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tarjeta } from "./Tarjeta.jsx";
import { VentaContext } from "@/Venta/3 componentesVenta/VentaContextProvider.jsx";
import { ModalTerminos } from "./ModalTerminos.jsx";
import Entrada from "@/services/Entrada.js";
import { format } from "date-fns";
import Loading from "@/components/Loading/Loading.jsx";
import { env } from "@/configuracion/backend.js";

export const VentanaPago = ({ prev }) => {
  const navigate = useNavigate();
  const contexto = useContext(VentaContext);
  const total = Number(contexto.totalContext.total.toFixed(2));

  const [metodo, setMetodo] = useState("");

  const [terminos, setTerminos] = useState(true);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const [status, setStatus] = useState({ error: false, msg: null });

  env === "dev" && console.log(terminos);

  const volver = () => {
    prev();
  }

  let bloquearSolicitud = false;

  const generarBodyRequest = () => {
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

    return {
      id_funcion: contexto.general.funcion.idFuncion,
      entradas: entradas,
      tiempoRegistro: format(new Date(Date.now()), "yyyy-MM-dd.HH:mm:ss").replace(".", "T")
    }
  }

  const registrarEntrada = () => {
    if (!bloquearSolicitud) {
      bloquearSolicitud = true;
      contexto.general.setSubmitting(true);

      const cuerpo = generarBodyRequest()

      Entrada.comprarEntrada(cuerpo).then(res => {
        env === "dev" && console.log(res);
        navigate("/entradas", { state: { entradas: res.data.entradasCompradasDTO } })
      }).catch(err => {
        console.log(err);
        if (err.response?.data.estado)
          setStatus({ error: true, msg: err.response.data.estado })
        else
          setStatus({ error: true, msg: "No se pudo conectar con el servidor." });
      }).finally(_ => {
        contexto.general.setSubmitting(false);
      })
    }
  }

  return (
    <>
      {status.error &&
        <div className="mb-5 w-100 d-flex flex-column align-items-center">
          <div className="bg-danger bg-opacity-10 text-danger p-3 w-100 text-center border border-danger shadow mb-3">
            Error: {status.msg}
          </div>

          <button className="btn btn-primary" onClick={() => { navigate("/"); }}>Volver a la página inicial</button>
        </div>
      }

      {contexto.general.submitting ?
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
        :
        <>
          <div className="container-fluid d-flex flex-column justify-content-center align-items-center gap-4">
            <h2 className="ancizar-sans-regular mb-0">Módulo de pago</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 className="ancizar-sans-regular mb-0">{"Total: S/ " + total.toFixed(2)}</h3>
            </div>
            {/* terminos y condiciones */}
            <div className="terms">
              <label className="switch m-2">
                <input type="checkbox" id="terminos" checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  disabled={!{ terminos, setTerminos }.terminos} />
                <span className="slider round"></span>
              </label>
              <label htmlFor="terminos" className="ancizar-sans-regular fs-5">
                Acepto los{" "}
                <button className="link"
                  onClick={(e) => { e.preventDefault(); setModalAbierto(true) }}>
                  términos y condiciones
                </button>
              </label>
            </div>

            {aceptaTerminos && <div className="formulario-contacto">
              <Tarjeta metodo={metodo} setMetodo={setMetodo}
                setto={{ setTerminos }} registrarEntrada={registrarEntrada} generarBodyRequest={generarBodyRequest} />
            </div>}

            {/*<BilleteraElectronica metodo={metodo} setMetodo={setMetodo} />*/}

            {modalAbierto && <ModalTerminos onClose={() => setModalAbierto(false)} />}
          </div>

          <div className="d-flex justify-content-center gap-4 align-items-center mt-4">
            <button className="btn btn-primary btn-primary-gradient" disabled={aceptaTerminos} onClick={volver} >Volver</button>
            <button className="btn btn-warning btn-warning-gradient" onClick={registrarEntrada}>Registrar (test)</button>
          </div>
        </>
      }
    </>
  );
};
