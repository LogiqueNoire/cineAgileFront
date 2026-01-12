import axios from 'axios'
import { backend_url, env } from '../configuracion/backend'

class PagoService {
    static async procesarPago(bodyPago, bodyEntradas) {
        const id = crypto.randomUUID()
        const res = (await axios.post(`${backend_url}/api/venta/v1/pagos`, {
            token: bodyPago.token,
            email: bodyPago?.payer?.email || bodyPago.email, //para yape el segundo
            monto: bodyPago.transaction_amount,
            paymentMethodId: bodyPago.payment_method_id,
            issuerId: bodyPago.issuer_id,
            idOperacion: id,
            entradas: bodyEntradas
        }));
        env === "dev" && console.log(res.data)
        return res.data
    }
}

export default PagoService;