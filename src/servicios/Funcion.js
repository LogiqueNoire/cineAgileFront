import axios from 'axios'
import { url } from '../configuracion/backend'
import { format } from 'date-fns'

class Funcion {
    static async mostrarSedesFuncionesPorPelicula(idPelicula, fecha) {
        const funciones = await axios(`${url}/funcion/pelicula/${idPelicula}?fecha=${fecha}`)
        
        if (funciones.data) {
            funciones.data.map(el => {
                el.funciones.map(func => {
                    func.fechaHoraFin = format(new Date(func.fechaHoraFin + "Z"), "yyyy-mm-dd.HH:mm:ss").replace(".", "T");
                    func.fechaHoraInicio = format(new Date(func.fechaHoraInicio + "Z"), "yyyy-mm-dd.HH:mm:ss").replace(".", "T");
                    // console.log(el.nombreSede, func);
                })
            })
        }

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

    static async cantidadButacasDisponibles(idFuncion) {
        const cantidad = await axios.get(`${url}/funcion/cantidadButacasDisponibles?idFuncion=${idFuncion}`)
        return cantidad.data
    }
}

export default Funcion;