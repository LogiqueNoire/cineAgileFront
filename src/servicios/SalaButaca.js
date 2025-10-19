import { url } from '../configuracion/backend'
import axios from "axios";
import Cookies from 'js-cookie';

class SalaButaca {

    static async getButacas(idSala) {
        const urlReq = `${url}/api/v1/salas/${idSala}/butacas`
        const res = await axios.get(urlReq)
        return res.data
    }

    static convButacasAMatriz(butacas) {
        let max_row, max_col
        let matriz = butacas.reduce((acc, el) => {
            // if (!el.activo)
            //    return acc;

            max_row = Object.keys(acc).length === 0 ? el.fila : (max_row > el.fila ? max_row : el.fila)
            max_col = Object.keys(acc).length === 0 ? el.columna : (max_col > el.columna ? max_col : el.columna)

            acc[el.fila] = { ...acc[el.fila], [el.columna]: { id: el.id, discap: el.discapacitado, ocupado: el.ocupado } }
            return acc
        }, {})

        return [max_row, max_col, matriz];
    }

    static async salasPorSede(sedeElegida) {
        const salas = await axios.get(`${url}/api/v1/intranet/salas`, {
            params: { idSede: sedeElegida },
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });
        return salas.data
    }

    static async crearSala(sala) {
        const res = await axios.post(`${url}/api/v1/intranet/salas`, sala, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });

        return res;
    }

    static async editarSala(sala) {
        const res = await axios.patch(`${url}/api/v1/intranet/salas`, sala, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });
        
        return res;
    }

    static async cambiarEstado(idSala, nuevoEstado) {
        const res = await axios.patch(`${url}/api/v1/intranet/salas/${idSala}/estado`, { activo: nuevoEstado }, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });
        
        return res;
    }

}

export default SalaButaca