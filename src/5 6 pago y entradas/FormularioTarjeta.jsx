import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx";
import Entrada from "../servicios/Entrada.js";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../Toast.jsx";
import { format } from "date-fns";
import axios from 'axios';
const TOKEN = import.meta.env.VITE_TOKEN;

export const FormularioTarjeta = ({ tarjeta, setTarjeta, setSubmitting, setStatus, setto, tipoCambio }) => {
  const contexto = useContext(VentaContext)
  const total = Number(contexto.totalContext.total.toFixed(2));

  const [toast, setToast] = useState({ visible: false, titulo: '', mensaje: '' });

  const navigate = useNavigate();
  // Temporal
  let bloquearSolicitud = false;

  const registrarTest = () => {
    if (!bloquearSolicitud) {
      bloquearSolicitud = true;
      setSubmitting(true);

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

      Entrada.comprarEntrada(cuerpo).then(res => {
        console.log(res);
        navigate("/entradas", { state: { entradas: res.data.entradasCompradasDTO } })
      }).catch(err => {
        console.log(err);
        if (err.response?.data.estado)
          setStatus({ error: true, msg: err.response.data.estado })
        else
          setStatus({ error: true, msg: "No se pudo conectar con el servidor." });
      }).finally(_ => {
        setSubmitting(false);
      })
    }
  }

  return (
    <div>

      <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, locale: "es_PE" }}>
        <PayPalButtons
          onClick={(data, actions) => {
            setto.setTerminos(false);
            contexto.general.setSubmitting(true);
            return actions.resolve();
          }}
          onCancel={(data, actions) => {
            setto.setTerminos(true);
            contexto.general.setSubmitting(false);
            return actions.redirect()
          }}
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: Math.round((total / tipoCambio) * 100) / 100
                },
                custom_id: 23232
              }],
              application_context: {
                shipping_preference: "NO_SHIPPING", // Oculta dirección completa
              },
              payer: {
              }
            })
          }}
          onApprove={(_, actions) => {
            return actions.order.capture().then(details => {
              registrarTest()
              console.log(details)
              setToast({
                visible: true,
                titulo: 'Pago exitoso',
                mensaje: ''
              });
              setTimeout(() => setToast({ visible: false }), 3000);
            })
          }}
        />
      </PayPalScriptProvider>
      <Toast tipo={'toast-info'}
        titulo={toast.titulo}
        mensaje={toast.mensaje}
        visible={toast.visible} />
    </div>
  );
};