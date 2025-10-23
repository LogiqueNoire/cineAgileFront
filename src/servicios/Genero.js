import axios from 'axios'
import { url } from '../configuracion/backend'

class Genero {
    static consultarGeneros = async () => {
        const datos = (await axios.get(`${url}/api/intranet/v1/generos`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })).data;

        return datos
    }
}
export default Genero