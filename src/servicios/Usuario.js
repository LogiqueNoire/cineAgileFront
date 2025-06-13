import { url } from '../configuracion/backend'
import axios from "axios";
import Cookies from 'js-cookie';

class Usuario {

    static async mostrarUsuarios() {
        const res = await axios.get(`${url}/intranet/usuario`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })

        return res.data;
    }

    static async crearUsuario(datosFormulario) {
        const res = await axios.post(`${url}/intranet/usuario`, datosFormulario, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })

        return res.data;
    }

}

export default Usuario;