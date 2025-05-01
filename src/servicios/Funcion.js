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

}

export default Funcion;