import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { useContext, useEffect, useState } from 'react';
import { VentaContext } from '@/venta/VentaContextProvider';
import PagoService from '@/services/PagoService';
import { env, publicKeyMercadoPago } from '@/configuracion/backend';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '@/context/ToastContextProvider';

const PasarelaMetodoPago = ({ generarBodyRequest }) => {
    const { showToast } = useContext(ToastContext)
    const contexto = useContext(VentaContext)
    const total = Number(contexto.totalContext.total.toFixed(2));
    const [visible, setVisible] = useState(total != 0)
    const navigate = useNavigate()

    useEffect(() => {
        if (publicKeyMercadoPago) {
            initMercadoPago(publicKeyMercadoPago, { locale: 'es-PE' });
        } else {
            console.warn("No se encontró la clave pública de MercadoPago.");
        }
    }, []);

    return (
        <div style={{ width: '300px' }}>
            {visible && <CardPayment
                initialization={{ amount: total }}
                onSubmit={async (formData) => {
                    try {
                        contexto.general.setSubmitting(true)
                        env === "dev" && console.log(formData)
                        const body = generarBodyRequest()
                        const data = await PagoService.procesarPago(formData, body)
                        if (data.status === "Pago aprobado" && data.statusDetail === "Pago recibido") {
                            showToast({ tipo: 'toast-info', titulo: 'Pago exitoso', mensaje: '' });
                            setTimeout(() => {
                                contexto.general.setSubmitting(false)
                                setVisible(false);
                                navigate("/entradas", {
                                    state: { entradas: data.resultadoRegistroEntradas.entradasCompradasDTO }
                                });
                            }, 3000);
                        } else {
                            showToast({ tipo: 'toast-danger', titulo: 'Error en el pago', mensaje: data.statusDetail });
                        }
                    } catch (error) {
                        showToast({ tipo: 'toast-danger', titulo: 'Error en el pago', mensaje: `Código de error: ${err.status}` });
                        console.error("Error procesando pago:", error);
                    } finally {
                        contexto.general.setSubmitting(false);
                    }
                }}
                onReady={() => { env === "dev" && console.log("Formulario listo"); }}
                customization={{ paymentMethods: { maxInstallments: 1 } }}
            />}
        </div>
    )
}

export default PasarelaMetodoPago;