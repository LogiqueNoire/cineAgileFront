import { url } from '../configuracion/backend'
import axios from "axios";
import Cookies from 'js-cookie';

class SalaButaca {

    static async getButacas(idSala) {
        const urlReq = `${url}/sala/${idSala}/butacas`
        const res = await axios.get(urlReq)
        return res.data
    }

    static convButacasAMatriz(butacas) {
        let max_row, max_col
        let matriz = butacas.reduce((acc, el) => {
            max_row = Object.keys(acc).length === 0 ? el.fila : (max_row > el.fila ? max_row : el.fila)
            max_col = Object.keys(acc).length === 0 ? el.columna : (max_col > el.columna ? max_col : el.columna)

            acc[el.fila] = { ...acc[el.fila], [el.columna]: { id: el.id, discap: el.discapacitado, ocupado: el.ocupado } }
            return acc
        }, {})

        return [max_row, max_col, matriz];
    }

    static async salasPorSede(sedeElegida) {
        const salas = await axios.get(`${url}/intranet/salasPorSede`, {
            params: { idSede: sedeElegida },
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });
        return salas.data
    }

    static async crearSala(sala) {
        const res = await axios.post(`${url}/intranet/crearsala`, sala, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });

        return res;
    }

    static async editarSala(sala) {
        const res = await axios.patch(`${url}/intranet/sala`, sala, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });
        
        return res;
    }

}

export default SalaButaca