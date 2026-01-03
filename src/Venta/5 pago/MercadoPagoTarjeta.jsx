import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '@/configuracion/backend';
import { VentaContext } from '@/Venta/3 componentesVenta/VentaContextProvider';
const publicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY

const MetodoPagoTarjeta = ({ onVentanaPagoClose }) => {
    const contexto = useContext(VentaContext)
    const total = Number(contexto.totalContext.total.toFixed(2));

    const [visible, setVisible] = useState(total != 0)

    useEffect(() => {
        if (publicKey) {
            initMercadoPago(publicKey, { locale: 'es-PE' });
        } else {
            console.warn("No se encontró la clave pública de MercadoPago.");
        }
    }, []);

    return (
        total >= 0 && visible ?
            <div style={{ width: '300px' }}>
                <CardPayment
                    initialization={{ amount: total }}
                    onSubmit={async (formData) => {
                        try {
                            const res = await axios.post(`${backend_url}/procesar-pago`, {
                                token: formData.token,
                                email: formData.payer.email,
                                monto: total,
                                paymentMethodId: formData.payment_method_id,
                                issuerId: formData.issuer_id,
                                idCuota: deuda.idCuota
                            });

                            const res2 = await axios.post(`${backend_url}/api/pago`, {
                                monto: total,
                                fechaCancelacion: new Date(),
                                metodoPago: "Tarjeta",
                                idCuota: deuda.idCuota
                            });
                            console.log(res2)
                            onVentanaPagoClose("actualizar")
                            setVisible(false)
                        } catch (error) {
                            console.error("Error procesando pago:", error);
                        }
                    }}
                    onReady={() => {
                        console.log("Formulario listo");
                    }}
                    customization={{ paymentMethods: { maxInstallments: 1 } }}
                />
            </div>
            :
            <div>Ya se pagó la cuota</div>
    )
}

export default MetodoPagoTarjeta;