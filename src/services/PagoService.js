import axios from 'axios'
import { backend_url, env } from '../configuracion/backend'

class PagoService {
    static async procesarPago(formData, body) {
        const id = crypto.randomUUID()
        const res = (await axios.post(`${backend_url}/api/venta/v1/pagos`, {
            token: formData.token,
            email: formData.payer.email,
            monto: formData.transaction_amount,
            paymentMethodId: formData.payment_method_id,
            issuerId: formData.issuer_id,
            idOperacion: id,
            entradas: body
        }));
        env === "dev" && console.log(res.data)
        return res.data
    }
}

export default PagoService;