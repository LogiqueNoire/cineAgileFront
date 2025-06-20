import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx";
import Entrada from "../servicios/Entrada.js";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../Toast.jsx";
import { format } from "date-fns";

export const FormularioTarjeta = ({ tarjeta, setTarjeta }) => {
  const contexto = useContext(VentaContext)
  const total = Number(contexto.totalContext.total.toFixed(2));

  const [toast, setToast] = useState({ visible: false, titulo: '', mensaje: '' });

  const navigate = useNavigate();
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

      Entrada.comprarEntrada(cuerpo).then(res => {
        console.log(res);
        navigate("/entradas", { state: { entradas: res.data.entradasCompradasDTO } })
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div>

      <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, locale: "es_PE" }}>
        <PayPalButtons
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: Math.round((total / 3.7) * 100) / 100
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

/*
    <form className="formulario-tarjeta" onSubmit={simularPago}>
      <div className="input-row">
        <input
          className="input-numero"
          type="text"
          name="numero"
          placeholder="Número de tarjeta"
          value={tarjeta.numero}
          onChange={handleChange}
          maxLength={16}
          required
        />
        <select
          className="input-tipo"
          name="tipo"
          value={tarjeta.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Tipo</option>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
        </select>
      </div>

      <div className="input-row">
        <select
          className="input-mes"
          name="mes"
          value={tarjeta.mes}
          onChange={handleChange}
          required
        >
          <option value="">Mes</option>
          {[...Array(12)].map((_, i) => {
            const month = (i + 1).toString().padStart(2, "0");
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>

        <select
          className="input-anio"
          name="anio"
          value={tarjeta.anio}
          onChange={handleChange}
          required
        >
          <option value="">Año</option>
          {(() => {
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let i = 0; i < 10; i++) {
              const year = (currentYear + i).toString().slice(2);
              years.push(year);
            }
            return years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ));
          })()}
        </select>

        <input
          className="input-cvv"
          type="text"
          name="cvv"
          placeholder="CVV"
          value={tarjeta.cvv}
          onChange={handleChange}
          maxLength={3}
          required
        />
      </div>

      <button type="submit" className="pay-button">
        Pagar
      </button>
      
    </form>*/
