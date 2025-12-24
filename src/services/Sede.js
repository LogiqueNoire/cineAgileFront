import { url } from '@/configuracion/backend'
import axios from "axios";
import Cookies from 'js-cookie';

class Sede {

    static async mostrarSedesActivas() {
        const res = await axios.get(`${url}/api/intranet/v1/sedes/activas`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });

        return res.data;
    }

    static async todasSedes() {
        const datos = (await axios.get(`${url}/api/intranet/v1/sedes`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })).data;
        return datos
    }

}

export default Sede;