import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import { VentaContext } from "@/Venta/3 componentesVenta/VentaContextProvider.jsx";
import Toast from "@/components/Toast/Toast.jsx";

const PasarelaPayPal = ({ setto, tipoCambio, registrarEntrada }) => {
  const contexto = useContext(VentaContext)
  const total = Number(contexto.totalContext.total.toFixed(2));
  const [toast, setToast] = useState({ visible: false, titulo: '', mensaje: '' });

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
      <Toast tipo={'toast-info'} titulo={toast.titulo} mensaje={toast.mensaje} visible={toast.visible} />
    </div>
  );
};

export default PasarelaPayPal