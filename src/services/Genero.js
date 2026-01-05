import axios from 'axios'
import { backend_url } from '@/configuracion/backend'
    import Cookies from 'js-cookie'

class Genero {
    static consultarGeneros = async () => {
        const datos = (await axios.get(`${backend_url}/api/intranet/v1/generos`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })).data;
        console.info(datos)
        return datos
    }
}
export default Genero