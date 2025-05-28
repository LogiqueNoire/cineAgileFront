import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { VentaContext } from "../3 componentesVenta/VentaContextProvider.jsx";
import Entrada from "../servicios/Entrada.js";
import { useLocation, useNavigate } from "react-router-dom";


export const FormularioTarjeta = ({ tarjeta, setTarjeta }) => {
  const contexto = useContext(VentaContext)
  const total = contexto.totalContext.total;

    const navigate = useNavigate();
  // Temporal
  let bloquearSolicitud = false;

  const registrarTest = () => {
    if (!bloquearSolicitud) {
      bloquearSolicitud = true;

      const entradas = contexto.butacaContext.seleccionadas.map(el => ({ id_butaca: el.id, persona: "general" }));

      const cuerpo = {
        id_funcion: contexto.general.funcion.idFuncion,
        entradas: entradas,
        tiempoRegistro: (new Date(Date.now())).toISOString()
      }

      Entrada.comprarEntrada(cuerpo).then(res => {
        navigate("/entradas", { state: { entradas: res.data } })
      });
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarjeta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const simularPago = (e) => {
    e.preventDefault();
    console.log("Datos tarjeta:", tarjeta);
    alert("Pago simulado con éxito!");
  };

  return (
    <div>

      <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
        <PayPalButtons
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: total
                },
                custom_id: 23232 /*aqui va el numero de orden de la entrada*/
              }]
            })
          }}
          onApprove={(_, actions) => {
            return actions.order.capture().then(details=>{
              registrarTest() //////////////////////////////////////////////////////////////////
              console.log("Pago exitoso")
              console.log(details)
              alert("Pago exitoso")
            })
          }}
          />
      </PayPalScriptProvider>
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
