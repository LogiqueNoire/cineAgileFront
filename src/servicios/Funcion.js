import axios from 'axios'
import { url } from '../configuracion/backend'

class Funcion {

    static async mostrarSedesFuncionesPorPelicula(idPelicula, fecha) {
        const funciones = await axios(`${url}/funcion/pelicula/${idPelicula}?fecha=${fecha}`)
        return funciones.data
    }

    static async mostrarButacasDeFuncion(idFuncion) {
        const butacas = await axios.get(`${url}/funcion/butacas/${idFuncion}`)
        return butacas.data
    }

    static async mostrarPreciosdeFuncion(idFuncion, persona) {
        const precios = await axios.get(`${url}/funcion/precios?idFuncion=${idFuncion}&persona=${persona}`)  ///precios?idFuncion=225855&persona=22
        return precios.data
    }
}

export default Funcion;