import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { useContext, useEffect, useState } from 'react';
import { VentaContext } from '@/Venta/3 componentesVenta/VentaContextProvider';
import PagoService from '@/services/PagoService';
import Toast from '@/components/Toast/Toast';
import { env } from '@/configuracion/backend';
import { useNavigate } from 'react-router-dom';
const publicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY

const PasarelaMetodoPago = ({ generarBodyRequest }) => {
    const contexto = useContext(VentaContext)
    const total = Number(contexto.totalContext.total.toFixed(2));
    const [toast, setToast] = useState({ tipo: '', visible: false, titulo: '', mensaje: '' });
    const [visible, setVisible] = useState(total != 0)
    const navigate = useNavigate()

    useEffect(() => {
        if (publicKey) {
            initMercadoPago(publicKey, { locale: 'es-PE' });
        } else {
            console.warn("No se encontró la clave pública de MercadoPago.");
        }
    }, []);

    return (
        <div style={{ width: '300px' }}>
            {visible === true && <CardPayment
                initialization={{ amount: total }}
                onSubmit={async (formData) => {
                    try {
                        contexto.general.setSubmitting(true)
                        env === "dev" && console.log(formData)
                        const body = generarBodyRequest()
                        const data = await PagoService.procesarPago(formData, body)
                        setVisible(false)
                        if (data.status === "Pago aprobado" && data.statusDetail === "Pago recibido") {
                            contexto.general.setSubmitting(false);
                            navigate("/entradas", { state: { entradas: data.resultadoRegistroEntradas.entradasCompradasDTO } })
                            setToast({
                                tipo: 'toast-info',
                                visible: true,
                                titulo: 'Pago exitoso',
                                mensaje: ''
                            });
                            setTimeout(() => setToast({ visible: false }), 3000);
                        } else {
                            setToast({
                                tipo: 'toast-danger',
                                visible: true,
                                titulo: 'Error en el pago',
                                mensaje: data.statusDetail
                            });
                        }
                    } catch (error) {
                        console.error("Error procesando pago:", error);
                    }
                }}
                onReady={() => { env === "dev" && console.log("Formulario listo"); }}
                customization={{ paymentMethods: { maxInstallments: 1 } }}
            />}
            <Toast tipo={toast.tipo} titulo={toast.titulo} mensaje={toast.mensaje} visible={toast.visible} />
        </div>
    )
}

export default PasarelaMetodoPago;