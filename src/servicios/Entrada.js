import axios from 'axios'
import { url } from '../configuracion/backend'

class Entrada {

    static async comprarEntrada(datos) {
        const resultado = await axios.post(`${url}/entrada`, datos);
        return resultado;
    }

}

export default Entrada;