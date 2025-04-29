import axios from 'axios'
import { url } from '../configuracion/backend'

class Funcion {

    static async mostrarFuncionesPorPelicula(idPelicula) {
        const funciones = await axios(`${url}/funcion/pelicula/${idPelicula}`)
    }

}

export default Funcion;