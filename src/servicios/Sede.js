import { url } from '../configuracion/backend'
import axios from "axios";
import Cookies from 'js-cookie';

class Sede {

    static async mostrarSoloSedes() {
        const res = await axios.get(`${url}/intranet/soloSedes`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}`}});

        return res.data;
    }

}

export default Sede;