import { url } from '../configuracion/backend'
import axios from "axios";

class SalaButaca {

    static async getButacas(idSala) {
        const urlReq = `${url}/sala/${idSala}/butacas`
        const res = await axios.get(urlReq)
        return res.data
    }

}

export default SalaButaca