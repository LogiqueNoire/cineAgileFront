import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { VentaContext } from "@/ventat/VentaContextProvider.jsx";
import { ToastContext } from "@/context/ToastContextProvider";

const PasarelaPayPal = ({ setto, tipoCambio, registrarEntrada }) => {
  const contexto = useContext(VentaContext)
  const total = Number(contexto.totalContext.total.toFixed(2));
  const { showToast } = useContext(ToastContext)

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
              registrarEntrada()
              env === "dev" && console.log(details)
              showToast({ titulo: 'Pago exitoso', mensaje: '' });
            })
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PasarelaPayPal