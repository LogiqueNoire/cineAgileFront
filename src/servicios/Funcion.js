import axios from 'axios'
import { url } from '../configuracion/backend'

class Funcion {
    /*
    static async mostrarFuncionesPorPelicula(idPelicula) {
        const funciones = await axios(`${url}/funcion/pelicula/${idPelicula}`)
        return funciones.data
    }
*/
    static async mostrarSedesFuncionesPorPelicula(idPelicula, fecha) {
        const funciones = await axios(`${url}/funcion/pelicula/${idPelicula}?fecha=${fecha}`)
        return funciones.data
    }

    static async mostrarButacasDeFuncion(idFuncion) {
        const butacas = await axios.get(`${url}/funcion/butacas/${idFuncion}`)
        return butacas.data
    }

}

export default Funcion;