import { url } from '../configuracion/backend'
import axios from "axios";
import Cookies from 'js-cookie';

class Usuario {

    static async mostrarUsuarios() {
        const res = await axios.get(`${url}/api/v1/intranet/usuarios`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })

        return res.data;
    }

    static async crearUsuario(datosFormulario) {
        const res = await axios.post(`${url}/api/v1/intranet/usuarios`, datosFormulario, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })

        return res.data;
    }
    
    static async cambiarContra(datosFormulario) {
        const res = await axios.patch(`${url}/api/v1/intranet/usuarios/nuevacontra`, datosFormulario, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        })

        return res.data;
    }

}

export default Usuario;